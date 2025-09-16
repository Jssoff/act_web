// This file is required for the app directory to work.
// It's only used to provide a fallback for non-localized routes.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
