import prisma from '~/services/prismaClient';

export interface SolarData {
    solarradiation: number;
    uv: number;
    date: Date;
    zipcode: string;
}

export async function getSolarData(zip: string): Promise<SolarData | null> {
    const result = await prisma.$queryRaw<SolarData[]>`
        SELECT 
            AVG(solarradiation) AS solarradiation, AVG(uv) AS uv, MAX(DATE) AS date, zipcode
        FROM weather w
        INNER JOIN weatherlocations wl ON wl.weatherId=w.id
        INNER JOIN locations l ON l.id=wl.locationId
        WHERE
            l.zipcode = ${zip}
        GROUP BY l.zipcode`;

    return result[0] || null;
}