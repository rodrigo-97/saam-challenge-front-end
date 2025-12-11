export const formatBRL = (
	value: number,
	{
		minFraction = 2,
		maxFraction = 2,
	}: {
		minFraction?: number;
		maxFraction?: number;
	} = {},
) => {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
		minimumFractionDigits: minFraction,
		maximumFractionDigits: maxFraction,
	}).format(value);
};
