export type Link = {
  label: string;
  href: string;
};

export interface Props {
  links: Link[];
}

function Link({ props }: { props: Link }) {
  const { href, label } = props;

  return (
    <li
      class={"uppercase w-full lg:w-auto font-Poppins-Medium text-xs mx-4 p-6 lg:py-5 lg:px-4 lg:border-b-0 border-b last:border-b-0 lg:mx-2 hover:border-b-4 hover:border-b-danger"}
    >
      <a
        href={href}
        class="after:content-['\E910'] lg:after:content-none after:font-Element-Icons flex justify-between "
      >
        {label}
      </a>
    </li>
  );
}

function ItensMenu({ links }: Props) {
  return (
    <div
      class={"bg-default w-full flex flex-col lg:flex-row lg:justify-center min-h-[60px] items-center"}
    >
      <div class={"w-full lg:w-auto"}>
        <ul class={"flex w-full lg:w-auto flex-col lg:flex-row items-center"}>
          {links.map((link) => <Link props={link} />)}
        </ul>
      </div>
    </div>
  );
}

export default ItensMenu;
