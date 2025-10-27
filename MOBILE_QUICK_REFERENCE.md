# 📱 Guia Rápido - Mobile First

## Cheat Sheet para Desenvolvimento Mobile-First

### 🎯 Regra de Ouro
**Sempre comece com mobile (sem prefixo) e adicione breakpoints progressivamente!**

---

## 📏 Tamanhos Padrão

### Textos
```tsx
// Títulos principais
text-2xl sm:text-3xl md:text-4xl

// Títulos de cards
text-lg sm:text-xl

// Corpo de texto
text-sm sm:text-base

// Labels e descrições
text-xs sm:text-sm

// Footer e micro textos
text-[10px] sm:text-xs
```

### Botões
```tsx
// Botão principal
h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base

// Botão secundário
h-10 sm:h-11 px-4 sm:px-6 text-xs sm:text-sm

// Icon button
h-10 w-10 sm:h-11 sm:w-11
```

### Cards
```tsx
// Padding
p-4 sm:p-5 md:p-6

// Header
px-4 pt-4 pb-2 sm:px-6 sm:pt-5 sm:pb-3

// Content
px-4 pb-4 sm:px-6 sm:pb-5
```

### Espaçamentos
```tsx
// Entre elementos
space-y-4 sm:space-y-5 md:space-y-6

// Gaps em grids
gap-2 sm:gap-3 md:gap-4

// Margens
mb-2 sm:mb-3 md:mb-4
```

### Imagens
```tsx
// Preview de imagem
h-48 sm:h-64 md:h-96

// Logo
h-20 sm:h-28 md:h-32

// Ícones
h-4 w-4 sm:h-5 sm:w-5
```

---

## 🎨 Classes Essenciais

### Touch Optimization
```tsx
// Sempre adicionar em botões e links
touch-manipulation active:scale-95

// Para prevenir zoom duplo
-webkit-tap-highlight-color: transparent
```

### Responsividade
```tsx
// Grid responsivo
grid grid-cols-2 sm:grid-cols-4

// Flex responsivo
flex flex-col sm:flex-row

// Hidden em mobile
hidden sm:block

// Visible apenas em mobile
block sm:hidden
```

### Truncate e Overflow
```tsx
// Truncar texto
truncate

// Line clamp
line-clamp-2

// Scroll horizontal
overflow-x-auto
```

---

## 🔧 Componentes Prontos

### Botão Touch-Friendly
```tsx
<Button className="h-12 sm:h-14 touch-manipulation active:scale-95">
  Texto
</Button>
```

### Card Mobile
```tsx
<Card>
  <CardHeader className="px-4 pt-4 pb-2 sm:px-6 sm:pt-5 sm:pb-3">
    <CardTitle className="text-lg sm:text-xl">Título</CardTitle>
  </CardHeader>
  <CardContent className="px-4 pb-4 sm:px-6 sm:pb-5">
    Conteúdo
  </CardContent>
</Card>
```

### Grid de Informações
```tsx
<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
  <div className="p-3 sm:p-4">
    <p className="text-[10px] sm:text-xs">Label</p>
    <p className="text-lg sm:text-xl">Valor</p>
  </div>
</div>
```

---

## ⚡ Performance

### Animações
```tsx
// Rápidas e suaves
transition-all duration-300

// Com aceleração de hardware
transform-gpu

// Evitar em mobile
will-change (usar apenas quando necessário)
```

### Imagens
```tsx
// Sempre usar
loading="lazy"
object-cover
max-w-full h-auto
```

---

## 📱 Breakpoints

```
xs:  475px  (Extra small - novo)
sm:  640px  (Small)
md:  768px  (Medium)
lg:  1024px (Large)
xl:  1280px (Extra large)
2xl: 1400px (2X large)
```

---

## ✅ Checklist Rápido

Antes de fazer commit:
- [ ] Testei em 375px (iPhone SE)?
- [ ] Botões têm mínimo 44px de altura?
- [ ] Textos são legíveis sem zoom?
- [ ] Adicionei `touch-manipulation`?
- [ ] Usei mobile-first (sem prefixo primeiro)?
- [ ] Imagens são responsivas?
- [ ] Espaçamentos adequados para toque?

---

## 🚫 Evitar

```tsx
// ❌ Desktop first
className="text-lg md:text-base sm:text-sm"

// ❌ Tamanhos fixos
className="w-[500px]"

// ❌ Botões pequenos
className="h-8 w-8"

// ❌ Textos muito pequenos
className="text-[8px]"

// ❌ Muitas animações
className="animate-bounce animate-pulse animate-spin"
```

---

## ✅ Fazer

```tsx
// ✅ Mobile first
className="text-sm sm:text-base md:text-lg"

// ✅ Tamanhos relativos
className="w-full max-w-2xl"

// ✅ Botões touch-friendly
className="h-12 sm:h-14"

// ✅ Textos legíveis
className="text-xs sm:text-sm"

// ✅ Animações sutis
className="transition-all duration-300"
```

---

## 🎯 Exemplos Práticos

### Header Mobile
```tsx
<header className="flex items-center justify-between p-4 sm:p-6">
  <Button size="sm" className="h-10 sm:h-11">
    <ArrowLeft className="h-4 w-4" />
    <span className="hidden xs:inline">Voltar</span>
  </Button>
  <img src={logo} className="h-8 sm:h-10 md:h-12" />
  <div className="flex gap-1.5 sm:gap-2">
    {/* Actions */}
  </div>
</header>
```

### Lista de Items
```tsx
<div className="grid gap-2.5 sm:gap-3">
  {items.map((item) => (
    <div className="p-3 sm:p-4 rounded-lg">
      <div className="flex items-start justify-between gap-2 mb-2.5">
        <span className="text-base sm:text-lg truncate">{item.name}</span>
        <span className="text-xs sm:text-sm flex-shrink-0">{item.value}</span>
      </div>
    </div>
  ))}
</div>
```

### Form Mobile
```tsx
<form className="space-y-4 sm:space-y-5">
  <input 
    className="h-12 sm:h-14 text-sm sm:text-base px-4"
    type="text"
  />
  <Button className="w-full h-12 sm:h-14 touch-manipulation">
    Enviar
  </Button>
</form>
```

---

## 💡 Dicas Finais

1. **Teste sempre em dispositivo real** - Emuladores não capturam tudo
2. **Use o Chrome DevTools** - Modo responsivo + throttling de rede
3. **Priorize conteúdo** - Menos é mais em mobile
4. **Feedback visual** - Usuário precisa saber que tocou
5. **Performance primeiro** - Mobile tem menos recursos

---

**Lembre-se: Mobile First = Melhor Experiência para Todos! 🚀**
