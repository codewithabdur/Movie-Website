import blockContent from './blockContent'
import crewMember from './crewMember'
import castMember from './castMember'
import movie from './movie'
import person from './person'
import screening from './screening'
import plotSummary from './plotSummary'
import plotSummaries from './plotSummaries'
import needThings from './needThings'
import landingPage from './landingpage'
import contact from './contact'

export const schemaTypes = [
  // Document types
  movie,
  person,
  screening,
  needThings,
  landingPage,
  contact,

  // Other types
  blockContent,
  plotSummary,
  plotSummaries,
  castMember,
  crewMember,
]
