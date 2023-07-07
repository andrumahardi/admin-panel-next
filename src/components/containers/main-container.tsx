"use client";

import { Box, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { SideNav, UpperNav } from "../nav";
import { usePathname } from "next/navigation";
import { Footer } from "../footers";

const sidenavWidth = "250px";

export function MainContainer({ children }: { children: React.ReactNode }) {
  const [navWidth, setNavWidth] = useState(sidenavWidth);
  const pathname = usePathname();

  function compressNav() {
    if (navWidth === sidenavWidth) {
      setNavWidth("100px");
    } else {
      setNavWidth(sidenavWidth);
    }
  }

  return (
    <Flex bgColor="#f4f6f9">
      <Box w={navWidth} transition="all .5s" h="100vh" overflow="auto">
        <SideNav activeLink={pathname || "/"} isCompressed={navWidth !== sidenavWidth} />
      </Box>
      <Box transition="all .5s" w={`calc(100% - ${navWidth})`} h="100vh" overflow="auto">
        <UpperNav onClick={compressNav} />
        <Box minH="calc(100vh - 56px)" position="relative" overflow="auto">
          <Box p={4} mb={14}>
            {children}
          </Box>
          <Footer />
        </Box>
      </Box>
    </Flex>
  );
}
