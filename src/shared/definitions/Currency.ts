export const CURRENCY_KEY = ["GOLD", "SILVER", "BRONZE"] as const;
export type CurrencyKey = (typeof CURRENCY_KEY)[number];
export interface CurrencyMeta {
	displayName: string;
	iconId: string;
}

export const CurrencyMetaMap: Record<CurrencyKey, CurrencyMeta> = {
	GOLD: { displayName: "Gold", iconId: "rbxassetid://1234567890" },
	SILVER: { displayName: "Silver", iconId: "rbxassetid://1234567891" },
	BRONZE: { displayName: "Bronze", iconId: "rbxassetid://1234567892" },
} satisfies Record<CurrencyKey, CurrencyMeta>;

export type CurrencyMap = Record<CurrencyKey, number>;

export const DefaultCurrency: CurrencyMap = {
	GOLD: 0,
	SILVER: 0,
	BRONZE: 0,
};
