import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { fetchGeneralCategories } from "../services/fetch-general-categories";

export async function GeneralCategoriesCard() {
  const generalCategories = fetchGeneralCategories({ page: 1, perPage: 10 });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorias gerais</CardTitle>
        <CardDescription>
          Gerencie as categorias gerais do sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <pre>{JSON.stringify(generalCategories)}</pre>
      </CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
}
