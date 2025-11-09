export async function apiGET(
  url: string,
  params?: Record<string, string>,
) {
  const query = params
    ? "?" + new URLSearchParams(params).toString()
    : "";
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_API_VERSION}${url}${query}`;
  const res = await fetch(api, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  })
  const response = await res.json();
  const status = res.status;
  return {
    status: status,
    data: response
  }
}

export async function apiPOST(
  url: string,
  payload?: Record<string, string>
) {
  const api = `${process.env.NEXT_PUBLIC_BASE_URL}${process.env.NEXT_PUBLIC_BASE_API_VERSION}${url}`;
  const response = await fetch(api, {
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
  const res = await response.json();
  const status = response.status;
  return {
    status: status,
    data: res
  }
}