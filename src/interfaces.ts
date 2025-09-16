export interface GameDetailProps {
  id: number;
  nomeGioco: string;
  votoLancio: number | null;
  votoAggiornato: number | null;
  recensioneOriginale: string | null;
  analisiAggiornata: string | null;
  ultimaRevisione: string | null;
}
