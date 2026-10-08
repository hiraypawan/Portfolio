// Node 22's type stripping reads the exact data used by the HTML resume.
import { ownerProfile, resumeProjects, siteUrl } from '../src/data/ownerProfile.ts';
console.log(
  JSON.stringify({
    identity: ownerProfile.identity,
    contact: ownerProfile.conversion,
    socials: ownerProfile.socials,
    resume: ownerProfile.resume,
    projects: resumeProjects,
    siteUrl,
  }),
);
