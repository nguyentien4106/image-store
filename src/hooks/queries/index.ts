// Example query hook
export const queryKeys = {
  files: {
    all: ['files'] as const,
    list: (params: any) => [...queryKeys.files.all, 'list', params] as const,
  },
  user: {
    all: ['user'] as const,
    profile: () => [...queryKeys.user.all, 'profile'] as const,
  },
  // Add more query keys as needed
} as const 