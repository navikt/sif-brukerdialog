---
name: aksel-spacing
description: Responsiv layout med Aksel spacing-tokens og Box, VStack, HStack og HGrid
---

# Aksel Spacing Skill

Bruk denne skillen for spesifikke layout-oppgaver med Aksel spacing-tokens.

## Regler

1. **Aldri bruk Tailwind padding/margin (`p-`, `m-`, `px-`, `py-`) med Aksel-komponenter.** Bruk alltid Aksel spacing-tokens.
2. Bruk `Box` for padding/border/bakgrunn, `VStack` for vertikal stacking, `HStack` for horisontal og `HGrid` for responsive grids.
3. Bruk responsive verdier (`{ xs: 'space-4', md: 'space-8' }`) for padding og gap som skal tilpasse seg skjermstørrelse.

## Spacing Tokens

```
"space-0"   // 0px
"space-1"   // 4px
"space-2"   // 8px
"space-3"   // 12px
"space-4"   // 16px  ← Form field gaps, button groups
"space-5"   // 20px
"space-6"   // 24px  ← Card padding (mobil)
"space-8"   // 32px  ← Card padding (desktop), section gaps
"space-10"  // 40px  ← Page padding (desktop)
"space-12"  // 48px  ← Page padding block (desktop)
```

## Responsive Breakpoints

```
xs: "0px"     // Mobil (default)
sm: "480px"   // Stor mobil
md: "768px"   // Nettbrett
lg: "1024px"  // Desktop
xl: "1280px"  // Stor desktop
```

## Vanlige mønstre

```tsx
// Page container
<Box paddingBlock={{ xs: 'space-8', md: 'space-12' }} paddingInline={{ xs: 'space-4', md: 'space-10' }}>
  <VStack gap={{ xs: 'space-6', md: 'space-8' }}>{/* innhold */}</VStack>
</Box>

// Card
<Box background="surface-default" padding={{ xs: 'space-6', md: 'space-8' }} borderRadius="large" borderWidth="1" borderColor="border-subtle">
  <VStack gap="space-4">{/* innhold */}</VStack>
</Box>

// Form layout
<VStack gap="space-6">
  <VStack gap="space-4">
    <TextField label="Fornavn" />
    <TextField label="Etternavn" />
  </VStack>
  <HStack gap="space-4" justify="end">
    <Button variant="secondary">Avbryt</Button>
    <Button variant="primary">Send inn</Button>
  </HStack>
</VStack>

// Responsive grid
<HGrid gap="space-4" columns={{ xs: 1, sm: 2, lg: 4 }}>{/* innhold */}</HGrid>
```
