'use client';

import { useEffect, useState } from 'react';
import { Drawer, Text, Group, Image, Stack, ActionIcon, Box } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { STRIPE_PRIMARY_COLOR } from '@/constants';
import { Item } from './ProductMessage';
import { ProductDetailsView } from './ProductDetailsView';
import { CheckoutView } from './CheckoutView';
import { useRef } from 'react';

const SIZE_OPTIONS = ['S', 'M', 'L'];
const COLOR_OPTIONS = ['Black', 'Sage'];

export const ProductDrawer = ({
  opened,
  onClose,
  onExitTransitionEnd,
  item,
}: {
  opened: boolean;
  onClose: () => void;
  onExitTransitionEnd?: () => void;
  item: Item | null;
}) => {
  const [view, setView] = useState<'details' | 'checkout'>('details');
  const [selectedSize, setSelectedSize] = useState(SIZE_OPTIONS[1]);
  const [selectedColor, setSelectedColor] = useState(COLOR_OPTIONS[0]);
  const [animatedHeight, setAnimatedHeight] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!opened) {
      setView('details');
      setSelectedSize(SIZE_OPTIONS[1]);
      setSelectedColor(COLOR_OPTIONS[0]);
      setAnimatedHeight(null);
    }
  }, [opened]);

  const switchViewWithHeightTransition = (nextView: 'details' | 'checkout') => {
    if (!contentRef.current) {
      setView(nextView);
      return;
    }

    const currentHeight = contentRef.current.getBoundingClientRect().height;
    setAnimatedHeight(currentHeight);
    setView(nextView);

    requestAnimationFrame(() => {
      if (!contentRef.current) {
        return;
      }
      const nextHeight = contentRef.current.getBoundingClientRect().height;
      setAnimatedHeight(nextHeight);
    });
  };

  const goToCheckoutView = () => {
    switchViewWithHeightTransition('checkout');
  };

  const goToDetailsView = () => {
    switchViewWithHeightTransition('details');
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      onExitTransitionEnd={onExitTransitionEnd}
      position="bottom"
      closeOnClickOutside
      portalProps={{ target: '#iphone-drawer-portal' }}
      styles={{
        root: {
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          ['--drawer-height' as string]: 'auto',
          ['--drawer-flex' as string]: '0 0 auto',
        },
        overlay: { position: 'absolute', inset: 0 },
        inner: { position: 'absolute', inset: 0 },
        content: {
          height: 'auto',
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
        },
        body: { display: 'block' },
      }}
      title={
        <Group gap={6} justify="space-between" wrap="nowrap">
          <Group gap={6} wrap="nowrap">
            {view === 'checkout' && (
              <ActionIcon
                variant="transparent"
                color={STRIPE_PRIMARY_COLOR}
                onClick={goToDetailsView}
                aria-label="Back to product details"
                p={0}
                ml={-12}
              >
                <IconChevronLeft size={21} />
              </ActionIcon>
            )}
            <Image src="/galtee.svg" alt="Galtee" maw={36} mah={36} />
            <Stack gap={0}>
              <Text size="sm" fw={500}>
                Galtee
              </Text>
              <Text size="sm" c="dimmed">
                galteeoutdoors.com
              </Text>
            </Stack>
          </Group>
        </Group>
      }
    >
      <Box
        style={{
          overflow: 'hidden',
          height: animatedHeight ?? 'auto',
          transition: animatedHeight === null ? undefined : 'height 220ms ease',
        }}
        onTransitionEnd={(event) => {
          if (event.propertyName === 'height') {
            setAnimatedHeight(null);
          }
        }}
      >
        <Box ref={contentRef}>
          {view === 'details' ? (
            <ProductDetailsView
              item={item}
              sizeOptions={SIZE_OPTIONS}
              colorOptions={COLOR_OPTIONS}
              selectedSize={selectedSize}
              selectedColor={selectedColor}
              onSelectSize={setSelectedSize}
              onSelectColor={setSelectedColor}
              onBuy={goToCheckoutView}
            />
          ) : (
            <CheckoutView item={item} />
          )}
        </Box>
      </Box>
    </Drawer>
  );
};
