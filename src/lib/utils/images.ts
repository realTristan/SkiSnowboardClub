export async function imgb64ToFile(imgb64: string, filename: string) {
    const res = await fetch(imgb64).then(res => res.blob());
    const file = new File([res], filename, { type: "image/png" })
    return file
}