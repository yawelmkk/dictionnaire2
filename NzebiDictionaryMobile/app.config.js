export default ({ config }) => {
  return {
    ...config,
    extra: {
      ...config.extra,
      eas: {
        projectId: process.env.EXPO_PROJECT_ID || "nzebi-dictionary-mobile-2024"
      }
    }
  };
};