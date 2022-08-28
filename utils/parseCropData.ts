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

export interface ImageData {
  _id: string;
  imageUrl: string;
  dateReceived: string;
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

export const parseImages = (data: ImageData[]) => {
  if (Array.isArray(data)) {
    return data.reduce<ImageData[]>((acc, message) => {
      const { imageUrl, dateReceived, _id } = message;
      if (imageUrl) acc.push({ _id, imageUrl, dateReceived });
      return acc;
    }, []);
  } else return [];
};
