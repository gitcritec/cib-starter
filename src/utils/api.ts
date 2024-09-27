import { ConfigItem, PageApiComplete } from "@/types";


export async function fetchPageData(slug: string, id?: string, name?: string): Promise<PageApiComplete | undefined> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/${slug}/${id}/${name}`);
        if (!response.ok) {
            throw new Error("Failed to fetch page data");
        }
        const jsonResponse = await response.json();

        // Reduzindo os itens de configuração para um objeto mapeado
        const formattedConfig = jsonResponse.config.reduce((acc: Record<string, string | null>, item: ConfigItem) => {
            acc[item.KEY] = item.VALUE;
            return acc;
        }, {});

        const formattedResponse: PageApiComplete = {
            ...jsonResponse,
            config: formattedConfig,
        };

        return formattedResponse;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Erro ao buscar dados da API:', error.message);
        } else {
            console.error('Erro ao buscar dados da API:', error);
        }
    }
}

