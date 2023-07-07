import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.REACT_SANITY_CLI_PROJECT_ID,
    dataset: 'production'
  }
})
