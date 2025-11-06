export interface Edition {
  year: number;
  title: string;
  description: string;
  images: string[];
}

export interface Sponsor {
  name: string;
  logo: string;
}

export interface ContactForm {
  name: string;
  email: string;
  message: string;
}