export interface UserMessage {
  dateReceived: string;
  messageBody: string;
  temperature?: string | null;
  humidity?: string | null;
  ph?: string | null;
  ec?: string | null;
  handled: boolean;
  _id: string;
  imageUrl?: string | null;
}

export type RechartsTableData = Array<{ name: string; ph: number; ec: number; temperature: number; humidity: number }>;

export const parseCropData = (messageHistory: UserMessage[]): RechartsTableData => {
  const data = messageHistory.reduce<RechartsTableData>((data, message) => {
    const date = new Date(message.dateReceived).toLocaleString().split(',')[0].slice(0, -5);
    const { humidity, ph, ec, temperature } = message;
    if ([humidity, ph, ec, temperature].some((field) => Boolean(field)))
      data.push({
        name: date,
        ph: Number(message.ph) || 0,
        ec: Number(message.ec) || 0,
        humidity: Number(message.humidity) || 0,
        temperature: Number(message.temperature) || 0,
      });
    return data;
  }, []);
  return data;
};
