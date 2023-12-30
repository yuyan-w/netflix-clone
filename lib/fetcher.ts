const fetcher = <T>(url: string): Promise<T> =>
  fetch(url).then((res) => {
    if (!res.ok) {
      throw new Error(res.statusText);
    }
    return res.json() as Promise<T>;
  });

export default fetcher;
