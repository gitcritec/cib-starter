
import { SectionData } from "@/types";
import dynamic from "next/dynamic";

interface SectionTemplateProps {
    sectionData: SectionData;
    langId: string;
}

const Section = ({ sectionData, lang_id }: { sectionData: SectionData; lang_id: string }) => {
    const DynamicComponent = dynamic<SectionTemplateProps>(() => import(`../templates/${sectionData.TEAMPLATE}`));

    return <DynamicComponent sectionData={sectionData} langId={lang_id} />;
};

export default Section;