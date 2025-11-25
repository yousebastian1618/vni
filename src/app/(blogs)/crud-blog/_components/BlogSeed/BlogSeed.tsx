'use client'
import styles from './styles.module.scss';
import Form from "@/components/Form/Form";
import {AddBlogForms, AddBlogParagraphForm} from "@/objects/forms";
import {AdminBlogRemovalButton, AdminBlogsAddButtons, AdminCrudBlogsButtons} from "@/objects/buttons";
import type {Blog, Button as ButtonType, InputElement} from "@/types/types";
import Button from "@/components/Button/Button";
import {useCallback, useEffect, useState} from "react";
import Icon from "@/components/Icon/Icon";
import {useRouter} from "next/navigation";
import {useHandleClickAction} from "@/actions/clickAction";
import {useFormStore} from "@/stores/formStore";
import Preview from "@/app/(blogs)/crud-blog/_components/Preview/Preview";
import {useStatus} from "@/contexts/statusContext";


type ParagraphItem = {
  id: string;
  form: InputElement[],
}
type BlogSeedProps = {
  blog?: Blog
}

export default function BlogSeed({ blog }: BlogSeedProps) {

  const { forms, convertToParams, setForm, addForm, checkErrors, removeForm, swapFormNames, resetForm } = useFormStore();
  const { setStatus } = useStatus();
  const router = useRouter();
  const handleClickAction = useHandleClickAction();
  const [paragraphs, setParagraphs] = useState<ParagraphItem[]>([]);
  const [previewing, setPreviewing] = useState<boolean>(false);



  useEffect(() => {
    if (!blog) return;
    setForm('Blog', blog);
    if (blog.paragraphs && blog.paragraphs.length > 0) {
      const initialParagraphs: ParagraphItem[] = blog.paragraphs.map((p, idx) => {
        const label = `Paragraph ${idx + 1}`;
        const paragraphForm: InputElement[] = AddBlogParagraphForm.map((field) => ({
          ...field,
          value: (p as any)[field.name] ?? field.value,
        }));
        addForm(label, paragraphForm);
        return {
          id: crypto.randomUUID(),
          form: paragraphForm,
        };
      });
      setParagraphs(initialParagraphs);
    }
  }, [blog, setForm, addForm]);


  const resetBlogForms = useCallback(() => {
    resetForm('Blog');
    paragraphs.forEach((_, idx) => {
      const formName = `Paragraph ${idx + 1}`;
      resetForm(formName);
      removeForm(formName);
    });
    setParagraphs([]);
  }, [paragraphs, removeForm, resetForm]);

  const filteredCrudButtons = () => {
    if (previewing) {
      return AdminCrudBlogsButtons.filter((b) => !(b.name === 'previewBlogs' || b.name === 'cancel'));
    }
    return AdminCrudBlogsButtons.filter((b) => !(b.name === 'create|/blogs' || b.name === 'gobackBlogs'));
  }

  const handleClick = async (button: ButtonType) => {
    const { func, name } = button;
    if (func === 'navigation') {
      if (name === 'cancel') {
        router.push('/');
        return;
      }
      if (name === 'addParagraph') {
        setParagraphs((curr: ParagraphItem[]) => [...curr, {
          id: crypto.randomUUID(),
          form: AddBlogParagraphForm.map(field => ({ ...field }))
        }])
        return;
      }
      if (name === 'previewBlogs') {
        const hasError = checkErrors('Blog'); // fresh value from the store update
        if (hasError) {
          return;
        }
        if (paragraphs.length === 0) {
          setStatus('error', 'At least one paragraph is required.');
          return;
        }
        let index = 1;
        while (`Paragraph ${index}` in forms) {
          if (checkErrors(`Paragraph ${index}`)) {
            return;
          }
          index += 1;
        }
        setPreviewing(true);
        return;
      }
      if (name === 'gobackBlogs') {
        setPreviewing(false);
        return;
      }
    } else {
      const updatedBlog = convertToParams('Blog');
      const paragraphs = [];
      let index = 1;
      while (forms[`Paragraph ${index}`]) {
        paragraphs.push(convertToParams(`Paragraph ${index}`));
        index += 1;
      }
      let currButton = {...button};
      if (blog) {
        currButton.name = 'update|/blog';
      }
      const result = await handleClickAction(currButton, {
        'blog': updatedBlog,
        'paragraphs': paragraphs,
        'blogId': blog ? blog.id : null
      });
      if (result?.status !== undefined && result.status < 400) {
        resetBlogForms();
        setPreviewing(false);
      }
      router.push('/');
    }
  }

  const swap = (index: number) => {
    const updated = [...paragraphs];
    swapFormNames(`Paragraph ${index + 1}`, `Paragraph ${index + 2}`);
    [updated[index], updated[index + 1]] = [updated[index + 1], updated[index]];
    setParagraphs(updated);
  }

  const removeParagraph = (index: number) => {
    if (index < 0 || index >= paragraphs.length) return;
    const formName = `Paragraph ${index + 1}`;
    const totalParagraphs = paragraphs.length;
    removeForm(formName);
    for (let i = index + 2; i <= totalParagraphs; i += 1) {
      swapFormNames(`Paragraph ${i}`, `Paragraph ${i - 1}`);
    }
    setParagraphs((curr: ParagraphItem[]) => {
      const updated = [...curr];
      updated.splice(index, 1);
      return updated;
    });
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.label}>{blog ? 'Edit Blog' : 'Add Blog'}</h2>
      {previewing ? (
        <Preview />
      ) : (
        <>
          <div className={styles.blogForm}>
            <Form label='Blog' form={AddBlogForms} />
          </div>
          <div className={styles.paragraphs}>
            {paragraphs.map((paragraph, index) => {
              return (
                <div key={paragraph.id}>
                  <div className={styles.paragraph}>
                    <h2 className={styles.paragraphTitle}>Paragraph {index + 1}</h2>
                    <Form label={`Paragraph ${index+1}`} form={paragraph.form} />
                    <div className={styles.removeButton}>
                      <Button button={AdminBlogRemovalButton} handleButtonClick={() => removeParagraph(index)}/>
                    </div>
                  </div>
                  {index !== paragraphs.length - 1 && (
                    <div className={styles.swapLogo} onClick={() => swap(index)}>
                      <Icon icon={'swap'} />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
          <div className={styles.buttons}>
            {AdminBlogsAddButtons.map((button) => {
              return (
                <div key={button.name} className={styles.button}>
                  <Button button={button} handleButtonClick={() => handleClick(button)}/>
                </div>
              )
            })}
          </div>
        </>
      )}
      <div className={styles.blogsCrudButtons}>
        {filteredCrudButtons().map((button) => {
          return (
            <div key={button.name} className={styles.crudButton}>
              <Button button={button} handleButtonClick={() => handleClick(button)}/>
            </div>
          )
        })}
      </div>
    </div>
  )
}
