import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export default function MenuButton() {
  const { displayMenu } = useUI();

  return (
    <Button
      class="btn btn-circle btn-sm btn-ghost before:content-['\E909'] before:font-Element-Icons text-black before:block before:text-[1rem]"
      aria-label="open menu"
      onClick={() => {
        displayMenu.value = true;
      }}
    >
    </Button>
  );
}
