
import { SectionData } from "@/types";
import dynamic from "next/dynamic";

interface SectionTemplateProps {
    sectionData: SectionData;
}

const Section = ({ sectionData }: { sectionData: SectionData; }) => {
    const DynamicComponent = dynamic<SectionTemplateProps>(() => import(`../templates/${sectionData.TEAMPLATE}`));

    return <DynamicComponent sectionData={sectionData} />;
};

export default Section;