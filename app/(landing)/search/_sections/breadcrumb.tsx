import Breadcrumb from "@/components/breadcrumb";

export default async function SearchBreadcrumb() {
  return (
    <Breadcrumb
      links={[
        { label: "Əsas səhifə", href: "/" },
        { label: "Axtarışın nəticəsi", href: "/search" },
      ]}
      className="flex"
    />
  );
}
