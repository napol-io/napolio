import { sdk } from "@/utils/sdk";
import { Domains } from "./domains";
import { Epics } from "./epics";
import { Personas } from "./personas";

const Config = async ({ params: { organizationSlug, projectSlug } }) => {
  const data = await sdk.GetProjectBySlug({ projectSlug, organizationSlug });

  return (
    <div className="min-h-screen pt-12 mx-20 bg-white border dark:bg-black rounded-t-3xl dark:border-slate-800 border-slate-200">
      <Domains
        domains={data.projectBySlug.domainsList}
        projectId={data?.projectBySlug?.id}
      />
      <Personas
        personas={data.projectBySlug.personasList}
        projectId={data?.projectBySlug?.id}
      />
      <Epics
        epics={data.projectBySlug.epicsList}
        projectId={data?.projectBySlug?.id}
      />
    </div>
  );
};

export default Config;
