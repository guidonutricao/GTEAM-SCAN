# 🧪 Checklist de Testes Mobile - GTEAM Scan

## 📱 Dispositivos de Teste

### Prioridade Alta
- [ ] **iPhone SE (2020)** - 375x667px - iOS Safari
- [ ] **iPhone 12/13/14** - 390x844px - iOS Safari
- [ ] **Samsung Galaxy S21** - 360x800px - Chrome Android
- [ ] **Google Pixel 5** - 393x851px - Chrome Android

### Prioridade Média
- [ ] **iPhone 11 Pro Max** - 414x896px - iOS Safari
- [ ] **Samsung Galaxy A52** - 412x915px - Chrome Android
- [ ] **iPad Mini** - 768x1024px - iOS Safari
- [ ] **iPad Pro 11"** - 834x1194px - iOS Safari

### Prioridade Baixa
- [ ] **Tablet Android** - 800x1280px - Chrome
- [ ] **Fold/Flip devices** - Telas dobráveis

---

## 🎯 Testes Funcionais

### Página Inicial (Index)

#### Layout e Visualização
- [ ] Logo carrega corretamente
- [ ] Título "GTEAM Scan" está legível
- [ ] Cards de dicas são visíveis sem scroll horizontal
- [ ] Card de aviso está completo e legível
- [ ] Botões de upload são visíveis
- [ ] Footer está visível

#### Interações
- [ ] Botão "Escolher da Galeria" abre seletor de arquivos
- [ ] Botão "Tirar Foto" abre câmera (em dispositivo real)
- [ ] Preview da imagem aparece após seleção
- [ ] Botão "Enviar para Análise" funciona
- [ ] Feedback visual ao tocar botões (scale-95)
- [ ] Não há zoom indesejado ao tocar inputs

#### Responsividade
- [ ] Layout se ajusta em 375px (iPhone SE)
- [ ] Layout se ajusta em 390px (iPhone 12)
- [ ] Layout se ajusta em 768px (iPad)
- [ ] Sem scroll horizontal em nenhuma resolução
- [ ] Espaçamentos adequados em todas as resoluções

---

### Tela de Loading (AnalysisLoading)

#### Visualização
- [ ] Logo animado (float) funciona suavemente
- [ ] Spinner está centralizado
- [ ] Mensagens de progresso são legíveis
- [ ] Barra de progresso está visível
- [ ] Steps (3 colunas) cabem na tela
- [ ] Ícones de check/loading aparecem corretamente

#### Animações
- [ ] Float animation não causa lag
- [ ] Transição de mensagens é suave
- [ ] Barra de progresso anima corretamente
- [ ] Não há jank ou stuttering

#### Performance
- [ ] Carrega em menos de 1s
- [ ] Animações rodam a 60fps
- [ ] Não trava em dispositivos mais antigos

---

### Página de Relatório (Report)

#### Header
- [ ] Botão "Voltar" funciona
- [ ] Logo está visível
- [ ] Botões de Share e Download funcionam
- [ ] Todos os elementos cabem sem quebrar linha

#### Imagem da Refeição
- [ ] Imagem carrega corretamente
- [ ] Proporção mantida (object-cover)
- [ ] Altura adequada (não muito grande/pequena)
- [ ] Bordas arredondadas visíveis

#### Card de Ingredientes
- [ ] Lista de ingredientes é legível
- [ ] Grid 2x2 (mobile) funciona
- [ ] Valores nutricionais são legíveis
- [ ] Badges de número são visíveis
- [ ] Scroll funciona se lista for longa

#### Card de Resumo Nutricional
- [ ] Calorias totais em destaque
- [ ] Barras de progresso são visíveis
- [ ] Percentuais estão corretos
- [ ] Labels são legíveis
- [ ] Grid de informações adicionais (2 colunas) funciona

#### Footer e Ações
- [ ] Botão "Nova Análise" é clicável
- [ ] Footer está visível
- [ ] Textos são legíveis

#### Scroll
- [ ] Scroll suave em toda a página
- [ ] Não há elementos cortados
- [ ] Padding bottom adequado

---

## 🎨 Testes Visuais

### Tipografia
- [ ] Todos os textos são legíveis sem zoom
- [ ] Hierarquia visual está clara
- [ ] Contraste adequado (mínimo 4.5:1)
- [ ] Não há textos cortados ou overflow
- [ ] Line-height adequado para leitura

### Espaçamentos
- [ ] Padding interno dos cards adequado
- [ ] Gaps entre elementos consistentes
- [ ] Margens não causam scroll horizontal
- [ ] Elementos não ficam muito apertados
- [ ] Elementos não ficam muito espaçados

### Cores e Contraste
- [ ] Gradientes são visíveis
- [ ] Cores primárias se destacam
- [ ] Textos secundários são legíveis
- [ ] Borders são visíveis
- [ ] Sombras não são excessivas

### Imagens e Ícones
- [ ] Ícones têm tamanho adequado (mínimo 16px)
- [ ] Imagens não pixelizam
- [ ] Logo mantém qualidade
- [ ] Emojis são visíveis

---

## 👆 Testes de Touch

### Áreas de Toque
- [ ] Todos os botões têm mínimo 44x44px
- [ ] Espaço adequado entre elementos clicáveis
- [ ] Não há elementos muito próximos
- [ ] Fácil tocar com polegar

### Feedback Visual
- [ ] Botões mudam ao tocar (active:scale-95)
- [ ] Não há flash azul indesejado
- [ ] Transições são suaves
- [ ] Estados hover/active são claros

### Gestos
- [ ] Scroll vertical funciona
- [ ] Scroll horizontal não acontece acidentalmente
- [ ] Pinch to zoom funciona (quando permitido)
- [ ] Swipe back funciona (iOS)
- [ ] Pull to refresh não interfere

---

## ⚡ Testes de Performance

### Carregamento
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Imagens carregam progressivamente
- [ ] Não há layout shift

### Animações
- [ ] Rodam a 60fps
- [ ] Não causam lag
- [ ] Não drenam bateria excessivamente
- [ ] Podem ser desabilitadas (prefers-reduced-motion)

### Rede
- [ ] Funciona em 3G (throttling)
- [ ] Funciona em 4G
- [ ] Funciona em WiFi lento
- [ ] Mostra loading states apropriados
- [ ] Trata erros de rede

### Memória
- [ ] Não há memory leaks
- [ ] Imagens são liberadas da memória
- [ ] Não trava em dispositivos antigos

---

## 🔄 Testes de Orientação

### Portrait (Vertical)
- [ ] Layout funciona perfeitamente
- [ ] Todos os elementos são acessíveis
- [ ] Scroll funciona corretamente

### Landscape (Horizontal)
- [ ] Layout se adapta
- [ ] Não há elementos cortados
- [ ] Experiência ainda é boa

### Rotação
- [ ] Transição suave entre orientações
- [ ] Estado é mantido
- [ ] Não há bugs visuais

---

## 🌐 Testes de Navegadores

### iOS Safari
- [ ] Layout correto
- [ ] Animações funcionam
- [ ] Upload de imagem funciona
- [ ] Câmera funciona
- [ ] Share API funciona

### Chrome Android
- [ ] Layout correto
- [ ] Animações funcionam
- [ ] Upload de imagem funciona
- [ ] Câmera funciona
- [ ] Share API funciona

### Firefox Mobile
- [ ] Layout correto
- [ ] Funcionalidades básicas funcionam

### Samsung Internet
- [ ] Layout correto
- [ ] Funcionalidades básicas funcionam

---

## ♿ Testes de Acessibilidade

### Zoom de Texto
- [ ] Funciona até 200%
- [ ] Layout não quebra
- [ ] Textos não se sobrepõem

### Leitores de Tela
- [ ] VoiceOver (iOS) funciona
- [ ] TalkBack (Android) funciona
- [ ] Ordem de leitura lógica
- [ ] Alt texts presentes

### Contraste
- [ ] Passa WCAG AA (4.5:1)
- [ ] Textos são legíveis
- [ ] Ícones são distinguíveis

### Navegação por Teclado
- [ ] Tab order lógico
- [ ] Focus visível
- [ ] Todos os elementos acessíveis

---

## 🔧 Testes de Edge Cases

### Conteúdo
- [ ] Nomes de ingredientes muito longos
- [ ] Lista com muitos ingredientes (10+)
- [ ] Valores nutricionais muito altos
- [ ] Sem dados (campos vazios)

### Imagens
- [ ] Imagem muito grande (>10MB)
- [ ] Imagem muito pequena (<100KB)
- [ ] Formato não suportado
- [ ] Imagem corrompida

### Rede
- [ ] Sem conexão
- [ ] Conexão lenta
- [ ] Timeout de API
- [ ] Erro 500 do servidor

### Dispositivo
- [ ] Bateria fraca
- [ ] Modo economia de energia
- [ ] Pouco espaço de armazenamento
- [ ] Câmera sem permissão

---

## 📊 Métricas de Sucesso

### Performance (Lighthouse Mobile)
- [ ] Performance: > 90
- [ ] Accessibility: 100
- [ ] Best Practices: > 90
- [ ] SEO: > 90

### Core Web Vitals
- [ ] LCP (Largest Contentful Paint): < 2.5s
- [ ] FID (First Input Delay): < 100ms
- [ ] CLS (Cumulative Layout Shift): < 0.1

### Usabilidade
- [ ] Taxa de conclusão de tarefa: > 95%
- [ ] Tempo médio de upload: < 30s
- [ ] Taxa de erro: < 5%
- [ ] Satisfação do usuário: > 4/5

---

## 🐛 Bugs Comuns a Verificar

- [ ] Scroll horizontal indesejado
- [ ] Elementos cortados nas bordas
- [ ] Botões muito pequenos para tocar
- [ ] Textos ilegíveis
- [ ] Imagens distorcidas
- [ ] Animações com lag
- [ ] Flash de conteúdo não estilizado (FOUC)
- [ ] Layout shift durante carregamento
- [ ] Zoom indesejado em inputs
- [ ] Botões não responsivos ao toque

---

## ✅ Aprovação Final

### Antes de Deploy
- [ ] Todos os testes críticos passaram
- [ ] Performance está aceitável
- [ ] Acessibilidade validada
- [ ] Testado em dispositivos reais
- [ ] Sem bugs bloqueantes
- [ ] Documentação atualizada

### Pós-Deploy
- [ ] Monitorar analytics
- [ ] Verificar crash reports
- [ ] Coletar feedback de usuários
- [ ] Monitorar Core Web Vitals
- [ ] Verificar taxa de conversão

---

## 📝 Notas de Teste

### Dispositivo: _____________
**Data:** __/__/____
**Testador:** _____________

#### Problemas Encontrados:
1. 
2. 
3. 

#### Observações:


#### Status: ⬜ Aprovado | ⬜ Reprovado | ⬜ Com Ressalvas

---

**Última atualização:** 26/10/2025
**Versão:** 1.0.0
