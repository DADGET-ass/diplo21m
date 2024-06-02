import { methodDefault } from "../defaultAPI";

/**
 * @year [number] - Год для создания расписания.
 * @month [number] - Месяц для создания расписания (1-12).
 */
export interface AutoGenParams {
    year: number,
    month: number,
};

export type IResponseAddShedule = {
    message?: string;
};

export const autoGen = ({ year, month }: AutoGenParams): Promise<IResponseAddShedule> =>
    methodDefault({
        path: `schedule/autoGen`,
        method: "POST",
        body: JSON.stringify({
            year,
            month,
        })
    });
