// 'positive', 'likely-positive', 'likely-negative', 'negative', 'uncertain'
export type HealthStateLikeliness = 'positive' | 'likely-positive' | 'likely-negative' | 'negative' | 'uncertain';
export interface HealthState {
  isHealthy: HealthStateLikeliness;
  hasPestPresence: HealthStateLikeliness;
  hasDeficiencies: HealthStateLikeliness;
}

export interface UserMessage {
  healthState: HealthState;
  _id: string;
  user: string;
  system: string;
  systemName: string;
  systemOwnerName: string;
  senderName: string;
  senderPhoneNumber: string;
  dateReceived: Date;
  messageBody: string;
  temperature?: string;
  humidity?: string;
  ph?: string;
  ec?: string;
  handled: boolean;
  __v: number;
  imageUrl?: string;
}

export interface ImageData {
  _id: string;
  imageUrl: string;
  dateReceived: string;
  healthState?: HealthState;
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
      const { imageUrl, dateReceived, _id, healthState } = message;
      if (imageUrl) acc.push({ _id, imageUrl, dateReceived, healthState });
      return acc;
    }, []);
  } else return [];
};
