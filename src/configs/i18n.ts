import { I18n } from "i18n-js";
import ptBR from "@/i18n/ptBR.json";

export const i18n = new I18n({ ptBR });

i18n.defaultLocale = "ptBR";
i18n.locale = "ptBR";
i18n.missingTranslation.register(
	"ndStrategy",
	() => "[mensagem não encontrada]",
);
i18n.missingBehavior = "ndStrategy";

export const t = i18n.t.bind(i18n);
