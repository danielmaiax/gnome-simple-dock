# Simple Dock

Barra de tarefas verde oliva para Ubuntu, baseada no **Dash to Panel 74**.
Versão inicial: **0.1.0**, para **GNOME Shell 50** (ambiente alvo: Ubuntu 26.04).

## Comportamento padrão

- Barra inferior de 32 px em cada monitor, sempre visível.
- Verde oliva escuro `#3B4423`, totalmente opaco.
- Cada barra mostra somente as janelas do seu monitor e espaço de trabalho atual.
- Janelas sem agrupamento por aplicativo; favoritos continuam disponíveis.
- Botão de aplicativos (Iniciar) somente no monitor principal do sistema.
- Relógio e controles do sistema em cada barra.
- Configurações próprias, separadas das configurações do Dash to Panel.

O botão Iniciar abre a grade de aplicativos do GNOME. A extensão não inclui um menu
estilo Windows. O papel de parede preto é uma configuração do desktop e não é
alterado pela extensão.

O layout não inclui identificadores dos monitores do autor: os padrões também
se aplicam a monitores novos. A regra do botão de aplicativos acompanha o monitor
principal e é aplicada novamente quando o Dash to Panel reconstrói as barras.
Os demais controles herdados continuam disponíveis na janela de preferências.

## Gerar e verificar

Requisitos: Python 3, Node.js e `glib-compile-schemas` (GLib).
Não requer baixar dependências.

```sh
python3 scripts/build.py
```

O processo verifica a sintaxe JavaScript, testa a regra do monitor principal,
compila os schemas, confere os padrões e gera:
`dist/simple-dock@dmagovbr.shell-extension.zip`.

## Instalar e experimentar

```sh
gnome-extensions install --force dist/simple-dock@dmagovbr.shell-extension.zip
```

Se o GNOME ainda não reconhecer a extensão instalada pelo ZIP, registre-a na
sessão atual: pressione **Alt + F2**, digite `lg` e execute no console:

```js
await Main.extensionManager.loadExtension(Main.extensionManager.createExtensionObject('simple-dock@dmagovbr', Gio.File.new_for_path(GLib.get_user_data_dir() + '/gnome-shell/extensions/simple-dock@dmagovbr'), 2))
```

Isso serve para a primeira instalação, quando a extensão ainda não aparece em
`gnome-extensions list`. O retorno `undefined` é normal. Feche o console com Esc.
Como alternativa, sair da sessão e entrar novamente também registra a extensão.

Então execute:

```sh
gnome-extensions disable dash-to-panel@jderose9.github.com
gnome-extensions disable ubuntu-dock@ubuntu.com
gnome-extensions enable simple-dock@dmagovbr
gnome-extensions prefs simple-dock@dmagovbr
```

Use somente uma dessas extensões de barra por vez. A Simple Dock mantém APIs
internas do projeto original, por isso não deve funcionar simultaneamente com
Dash to Panel. Sua configuração original fica preservada.

Para voltar:

```sh
gnome-extensions disable simple-dock@dmagovbr
gnome-extensions enable dash-to-panel@jderose9.github.com
```

## Validação

A extensão foi carregada e ativada no GNOME Shell 50.1 sem reiniciar a sessão.
A validação completa em vários monitores ainda está pendente. Conferir:

1. Barras embaixo, com altura e cor corretas em todas as telas.
2. Mover uma janela entre telas: ela aparece apenas na barra de destino.
3. Trocar de espaço de trabalho: somente suas janelas aparecem.
4. Alterar o monitor principal e conectar/desconectar uma tela: somente a tela
   principal mantém o botão de aplicativos.
5. Abrir preferências, mudar opções, desabilitar e reabilitar a extensão.

O isolamento filtra as janelas; o comportamento dos espaços de trabalho nas telas
secundárias também depende da configuração de espaços de trabalho do GNOME.

## Publicação

Repositório do projeto: https://github.com/danielmaiax/gnome-simple-dock.
O código é distribuído pelo GitHub; gere o ZIP com o comando de build acima.
Depois dos testes visuais, enviar o ZIP para https://extensions.gnome.org/upload/.
A listagem no GNOME Extensions depende de revisão; não há publicação automática.
O UUID deve continuar estável para manter as atualizações.

## Origem e licença

Fork independente de https://github.com/home-sweet-gnome/dash-to-panel,
baseado na versão 74 instalada localmente. Não é um produto oficial do Ubuntu
nem dos mantenedores do Dash to Panel.

Licença **GPL-2.0-or-later**. Os avisos de autoria e a licença originais foram
preservados. Veja `COPYING` e `UPSTREAM-README.md`. As alterações Simple Dock
incluem identidade própria, schema independente, padrões pessoais, regra do
monitor principal e ferramentas de empacotamento e validação.
