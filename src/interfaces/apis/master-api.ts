export interface IMasterChain {
  id: string;
  chainId: string;
  isTestnet: boolean;
  explorerUrl: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface ICurrency {
  name: string;
  symbol: string;
  id: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string | null;
}
