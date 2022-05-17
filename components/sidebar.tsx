import NextImage from "next/image";
import MenuList from "./menuList";
import { Box, Divider, Center } from "@chakra-ui/layout";
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";

const navMenu = [
  {
    name: "Home",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Search",
    icon: MdSearch,
    route: "/search",
  },
  {
    name: "Your Library",
    icon: MdLibraryMusic,
    route: "/library",
  },
];

const musicMenu = [
  {
    name: "Create Playlist",
    icon: MdPlaylistAdd,
    route: "/",
  },
  {
    name: "Favorites",
    icon: MdFavorite,
    route: "/favorites",
  },
];

const playlist = new Array(30).fill(1).map((__, i) => {
  return { name: `Playlist ${i + 1}`, route: "/" };
});

const Sidebar = () => {
  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%">
        <Box width="120px" marginBottom="20px" paddingX="20px">
          <NextImage src="/images/trax-logo.svg" height={60} width={120} />
        </Box>
        <Box marginBottom="20px">
          <MenuList listObject={navMenu} withIcons={true} />
        </Box>

        <Box marginY="20px">
          <MenuList listObject={musicMenu} withIcons={true} />
        </Box>
        <Divider color="gray.800" />
        <Box
          height="66%"
          overflowY="auto"
          paddingY="20px"
          css={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#616161",
              borderRadius: "24px",
            },
          }}
        >
          <MenuList listObject={playlist} withIcons={false} />
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
