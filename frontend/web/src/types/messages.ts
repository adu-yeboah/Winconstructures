export type Message = {
    id: number,
    title: string,
    email: string,
    subject: string,
    read?: boolean,
    message?: string,
    date?: string,
}