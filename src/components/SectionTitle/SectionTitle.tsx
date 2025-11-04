type Props = {
  title: string;
  layout: 'left' | 'right'
}

export default function SectionTitle({ title, layout }: Props) {
  return (
    <div className={`${layout === 'left' ? 'title-left' : 'title-right'}`}>
      {title}
    </div>
  )
}