---
name: aksel-spacing
description: Responsiv layout med Aksel spacing-tokens og Box, VStack, HStack og HGrid
---

# aksel-spacing

Bruk denne skillen for spesifikke layout-oppgaver med Aksel spacing-tokens.

## Regler

1. **Aldri bruk Tailwind padding/margin (`p-`, `m-`, `px-`, `py-`) med Aksel-komponenter.** Bruk alltid Aksel spacing-tokens.
2. Bruk `Box` for padding/border/bakgrunn, `VStack` for vertikal stacking, `HStack` for horisontal og `HGrid` for responsive grids.
3. Bruk responsive verdier (`{ xs: 'space-4', md: 'space-8' }`) for padding og gap som skal tilpasse seg skjermstørrelse.

## Spacing-tokens

Token-navnet er px-verdien. `space-8` = 8px, `space-16` = 16px, osv.

```
"space-0"   // 0px   (0rem)
"space-1"   // 1px   (0.0625rem)
"space-2"   // 2px   (0.125rem)
"space-4"   // 4px   (0.25rem)
"space-6"   // 6px   (0.375rem)
"space-8"   // 8px   (0.5rem)   ← Kompakt gap inni kort (f.eks. heading + brødtekst)
"space-12"  // 12px  (0.75rem)
"space-16"  // 16px  (1rem)     ← Feltgap i skjema, knappgrupper
"space-20"  // 20px  (1.25rem)
"space-24"  // 24px  (1.5rem)   ← Kortpadding (mobil)
"space-28"  // 28px  (1.75rem)
"space-32"  // 32px  (2rem)     ← Kortpadding (desktop), seksjonsgap
"space-40"  // 40px  (2.5rem)   ← Sidepadding inline (desktop)
"space-48"  // 48px  (3rem)     ← Sidepadding block (desktop)
```

> Ikke-eksisterende tokens: `space-3`, `space-5`, `space-10` finnes ikke — TypeScript vil gi feil.

## Responsive brytepunkter

```
xs: "0px"     // Mobil (default)
sm: "480px"   // Stor mobil
md: "768px"   // Nettbrett
lg: "1024px"  // Desktop
2xl: "1440px" // Stor desktop
```

## Vanlige mønstre

```tsx
// Page container
<Box paddingBlock={{ xs: 'space-32', md: 'space-48' }} paddingInline={{ xs: 'space-16', md: 'space-40' }}>
  <VStack gap={{ xs: 'space-24', md: 'space-32' }}>{/* innhold */}</VStack>
</Box>

// Card
<Box background="surface-default" padding={{ xs: 'space-24', md: 'space-32' }} borderRadius="large" borderWidth="1" borderColor="border-subtle">
  <VStack gap="space-16">{/* innhold */}</VStack>
</Box>

// Form layout
<VStack gap="space-24">
  <VStack gap="space-16">
    <TextField label="Fornavn" />
    <TextField label="Etternavn" />
  </VStack>
  <HStack gap="space-16" justify="end">
    <Button variant="secondary">Avbryt</Button>
    <Button variant="primary">Send inn</Button>
  </HStack>
</VStack>

// Responsive grid
<HGrid gap="space-16" columns={{ xs: 1, sm: 2, lg: 4 }}>{/* innhold */}</HGrid>
```
