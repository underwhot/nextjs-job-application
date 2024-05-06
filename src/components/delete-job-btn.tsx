import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { deleteJobAction } from "@/lib/actions";
import { toast } from "sonner";

export default function DeleteJobBtn({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (id: string) => deleteJobAction(id),
    onSuccess: (data) => {
      if (!data) {
        toast("There was an error");
        return;
      }

      queryClient.invalidateQueries({ queryKey: ["jobs"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      queryClient.invalidateQueries({ queryKey: ["charts"] });

      toast("Job deleted");
    },
  });

  return (
    <Button
      onClick={() => mutate(id)}
      variant="destructive"
      disabled={isPending}
    >
      Delete
    </Button>
  );
}
