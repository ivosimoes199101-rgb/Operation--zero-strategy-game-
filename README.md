# OPERATION ZERO — versão Web

Projeto inicial jogável em HTML, CSS e JavaScript, pensado para edição e execução num telemóvel Android, sem Godot.

## Executar no telemóvel
1. Envia estes ficheiros para um repositório GitHub.
2. No repositório, abre **Settings → Pages**.
3. Em **Build and deployment**, escolhe **Deploy from a branch**.
4. Seleciona a branch `main` e a pasta `/ (root)` e guarda.
5. Aguarda alguns minutos e abre o endereço GitHub Pages indicado pelo GitHub.

Também podes testar localmente abrindo `index.html` num browser que permita abrir ficheiros locais.

## O que já funciona
- Interface adaptada a ecrãs móveis.
- Menu e ecrã ZERO COMMAND.
- 12 operacionais com atributos e seleção de equipa até cinco.
- Fichas de atributos por duplo toque/toque prolongado.
- Recursos e construção de instalações.
- Lista inicial de missões e desbloqueio sequencial.
- Demonstração tática numa grelha, movimento, inimigos, extração e recompensa.
- Gravação local no browser através de `localStorage`.

## Limitações desta versão
Isto é uma primeira versão jogável/protótipo, não o jogo completo. O combate ainda é simplificado: não inclui ainda linha de visão real, cobertura funcional, sistema completo de pontos de ação, IA avançada, inventário, ferimentos persistentes, campanha completa, finais ou sincronização de gravações entre dispositivos. A gravação fica no browser e dispositivo em que jogas.

## Estrutura
- `index.html` — ecrãs e interface.
- `style.css` — visual e adaptação móvel.
- `game.js` — dados e lógica do protótipo.
- `.github/workflows/pages.yml` — publicação automática no GitHub Pages após configuração de Pages para GitHub Actions.
