import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Wine, Plus, X, Settings, Info, Linkedin, MessageCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const QP_PERGUNTAS_PADRAO = [
  "Qual é a sua fantasia sexual mais secreta?",
  "Você prefere ser o dominante ou o submisso na cama?",
  "Qual foi a sua experiência sexual mais inesquecível?",
  "Se você pudesse ter um encontro com qualquer pessoa famosa, quem seria?",
  "Qual é o lugar mais inusitado onde você já fez sexo?",
  "Você já teve um sonho erótico? Pode compartilhar?",
  "Qual é a sua opinião sobre brinquedos sexuais?",
  "Você tem algum fetiche que nunca revelou a ninguém? Qual é?",
  "Qual é a sua posição sexual favorita e por quê?",
  "Você já fez sexo em público? Como foi a experiência?",
  "Se você pudesse escolher entre um dia de sexo intenso ou uma semana de carícias, o que escolheria?",
  "Qual é a sua ideia de um encontro romântico perfeito?",
  "Você já trocou mensagens picantes? Como foi?",
  "Qual é o seu maior desejo relacionado a BDSM?",
  "Você já se sentiu atraído(a) por um(a) amigo(a)?",
  "Qual é a sua opinião sobre sexo casual?",
  "Você já teve um encontro às cegas? Como foi?",
  "Você já fez sexo casual? Como foi a experiência?",
  "Qual é a sua parte do corpo favorita em um parceiro(a)?",
  "Você já experimentou um striptease? Como foi?",
  "Você prefere sexo à luz do dia ou à noite? Por quê?",
  "Fale sobre o que você considera uma traição enquanto mantém um olhar penetrante em alguém.",
  "Descreva um momento em que você se sentiu atraído(a) por alguém que não conhecia.",
  "Já flertou com alguém em um bar? Como foi a experiência?",
  "Já pensou em transar com alguém do mesmo sexo? O que te atrai?",
  "Já pensou em transar com alguém da academia, trabalho ou faculdade? O que te atrai? Chegou a acontecer algo?",
];

const QP_CONSEQUENCIAS_PADRAO = [

  "Me faça uma massagem sensual. Comece pelos meus pés e vá subindo.",
  "Nos próximos 10 segundos, toque-se como gostaria de me tocar.",
  "mostre teus seios ou peitoral para o grupo por 10 segundos.",
  "Você tem dez segundos para me excitar apenas com um beijo. Dica: Você não está limitado aos meus lábios.",
  "Você tem dez segundos para me excitar tocando como quiser.",
  "Você tem dez segundos para qualquer um à sua escolha excitar tocando como quiser.",
  "Faça uma dança sensual para o grupo por 1 minuto, envolvendo toques e movimentos provocativos.",
  "Deixe alguém escolher uma parte do seu corpo para beijar enquanto você fecha os olhos.",
  "Tire uma peça de roupa e faça uma pose sexy por 10 segundos.",
  "Imite um ato sexual com um objeto disponível por 30 segundos.",
  "Dê um selinho em todos os membros do grupo, um por um.",
  "Faça uma massagem sensual em quem você escolher por 2 minutos.",
  "Faça uma massagem sensual em mim você escolher por 2 minutos.",
  "Tire uma selfie sexy e mostre para o grupo enquanto faz uma expressão provocante.",
  "Diga uma frase sedutora diretamente no ouvido de alguém, enquanto toca suavemente seu braço.",
  "Faça um elogio provocante a cada membro do grupo, tocando levemente em seus ombros durante o elogio.",
  "Olhe para alguém e descreva o que você faria se estivessem sozinhos.",
  "Crie uma nova posição sexual e demonstre com um(a) parceiro(a) de forma sugestiva.",
  "Descreva seu maior desejo sexual enquanto faz gestos sensuais com as mãos.",
  "Mantenha uma pose sexy enquanto o grupo te observa por 10 segundos.",
  "Dê um beijo suave no pescoço de alguém que você escolher.",
  "Faça uma dança no colo de alguém por 1 minuto, mantendo o contato visual.",
  "Toque suavemente em alguém enquanto conta sobre uma fantasia sexual que você gostaria de realizar.",
  "Deixe que alguém desenhe algo provocante em sua pele com um lápis de olho." ];

const QP_CONSEQUENCIAS_OBRIGATORIAS = [
  ...QP_CONSEQUENCIAS_PADRAO,
  "Você deve compartilhar um segredo sexual enquanto toca levemente a mão de alguém.",
  "Recrie uma cena da sua primeira vez com gestos e toques sutis.",
  "Revele qual é o seu maior desejo inconfessável enquanto abraça alguém por trás com as mãos dentro da roupa.",
  "Realize um toque sensual em alguém enquanto fala sobre um momento de ciúmes que você teve.",
  "Realize um toque sensual em mim enquanto fala sobre um momento de ciúmes que você teve.",
  "Escolha uma pessoa e faça uma massagem nas costas enquanto fala sobre sua primeira paixão.",
  "Descreva um encontro que não saiu como você planejou enquanto toca o rosto de alguém.",
  "Fale sobre uma pessoa que você gostaria de seduzir enquanto faz um gesto provocante.",
  "Conte sobre um momento em que se sentiu inseguro(a) em um relacionamento enquanto toca o ombro de alguém.",
  "Revele um desejo que você nunca teve coragem de compartilhar, tocando a mão de alguém enquanto fala.",
  "Descreva o que você acha que faz um beijo ser inesquecível enquanto simula o gesto com alguém.",
  "Fale sobre uma fantasia que você gostaria de realizar, convidando alguém para ajudá-lo a representá-la.",
  "Descreva um momento em que você se sentiu extremamente atraído(a) por alguém, mantendo a intensidade do olhar.",
  "Fale sobre o que você mais valoriza em um parceiro(a) enquanto faz um gesto de carinho." ];

const PERGUNTAS_PADRAO = [
  "Qual foi o lugar mais inusitado onde você já teve um encontro?",
  "Você já flertou com alguém em um bar? Como foi a experiência?",
  "Se você pudesse escolher alguém aqui para um encontro, quem escolheria?",
  "Qual é a sua bebida favorita para apimentar um encontro?",
  "Já fez algo sexy para impressionar alguém em um lugar público?",
  "Qual é a sua opinião sobre dar beijos em público?",
  "Você já teve um crush por alguém que conheceu em um bar? O que aconteceu?",
  "Qual é a sua técnica de flerte favorita quando está em um ambiente social?",
  "Você já pisou na bola com alguém em um lugar público? O que aconteceu?",
  "Descreva um momento em que você se sentiu atraído(a) por alguém que não conhecia.",
  "Qual é o seu truque infalível para chamar a atenção de alguém em um bar?",
  "Se você pudesse escolher um lugar público para um encontro romântico, qual seria?",
  "Você já teve um encontro que começou em um bar? Como foi a história?",
  "Qual é a sua música favorita que sempre te faz pensar em romance?",
  "Você já trocou olhares sugestivos com alguém em um local público?",
  "Qual foi a maior loucura que você já fez em uma festa?",
  "Você já se sentiu atraído(a) por alguém que estava em uma mesa próxima a você?",
  "Qual é a sua opinião sobre fazer declarações de amor em público?",
  "Você tem alguma experiência engraçada relacionada a encontros em bares?",
  "Qual é o seu drink favorito para conquistar alguém?",
  "Você deve compartilhar um segredo que aconteceu em um local público.",
  "Diga quem foi a pessoa mais atraente que você já conheceu em um bar.",
  "Fale sobre um momento em que você se sentiu extremamente atraído(a) por alguém em público.",
  "Descreva uma situação em que você teve que esconder sua atração por alguém.",
  "Conte sobre uma abordagem que foi muito ousada e funcionou.",
  "Revele qual é o seu maior desejo sexual que você gostaria de realizar em público.",
  "Fale sobre o que você considera uma traição em um relacionamento.",
  "Descreva um encontro que não saiu como você esperava em um bar.",
  "Conte sobre um flerte que deu muito certo e como foi.",
  "Diga qual é a sua parte favorita de um encontro em um lugar público.",
  "Revele um momento em que você se sentiu inseguro(a) ao flertar.",
  "Descreva um beijo que você deu em público e como as pessoas reagiram.",
  "Conte sobre uma situação em que você se sentiu atraído(a) por um(a) desconhecido(a).",
  "Fale sobre como você se sente em relação a trocas de olhares em público.",
  "Descreva um momento em que você se sentiu íntimo(a) com alguém em um ambiente social.",
  "Conte sobre uma história de amor que começou em um lugar público.",
  "Fale sobre o seu drink favorito para apimentar um encontro.",
  "Descreva a sua ideia de um flerte perfeito em um bar.",
  "Conte sobre um momento em que você ficou nervoso(a) ao falar com alguém atraente.",
  "Fale sobre a sua opinião sobre fazer declarações de amor em público."
];

const CONSEQUENCIAS_PADRAO = [
  "Diga algo sexy para a pessoa à sua esquerda em voz alta.",
  "Fale sobre uma experiência embaraçosa que aconteceu com você em um bar.",
  "Tire uma peça de roupa e mostre para o grupo.",
  "Faça um brinde com uma frase provocativa.",
  "Conte uma história engraçada que aconteceu com você em um lugar público.",
  "Deixe que alguém escolha uma parte do seu corpo para beijar.",
  "Imite um ato sexy que você gostaria de fazer em público.",
  "Crie um coquetel e dê um nome sensual para ele.",
  "Fale sobre o seu maior desejo que você tem em público.",
  "Tire uma selfie com uma pose sexy e mostre ao grupo.",
  "Diga uma frase de sedução para o garçom que está atendendo vocês.",
  "Escolha alguém para fazer uma massagem em você enquanto todos observam.",
  "Dê um selinho em alguém que você escolher no grupo.",
  "Descreva como seria um encontro perfeito em um local público.",
  "Fale sobre algo que você gostaria de fazer em um lugar público, mas nunca teve coragem.",
  "Cante uma parte de uma música romântica em voz alta.",
  "Faça uma pose sexy e mantenha-a por 10 segundos.",
  "Crie uma nova dança sensual e mostre para o grupo.",
  "Conte sobre o seu drink mais ousado que já pediu em um bar."
];

const CONSEQUENCIAS_OBRIGATORIAS = [
  ...CONSEQUENCIAS_PADRAO,
  "Escolha alguém para fazer uma massagem em você enquanto todos observam. Discretamente pois estão em um bar.",
  "Diga algo sexy para a pessoa à sua esquerda em voz alta.",
  "Fale sobre uma experiência embaraçosa que aconteceu com você em um bar. Discretamente",
  "Tire uma peça de roupa e mostre para o grupo. Discretamente",
  "Fala algo no ouvido de alguém que você escolher no grupo.",
  "Fala algo no meu ouvido que ningém mais possa ouvir.",
  "Deixe que alguém escolha uma parte do seu corpo para beijar. Discretamente pois estão em um bar.",
  "Imite um ato sexy que você gostaria de fazer em público. Discretamente",
  "Masturbe-se discretamente por 10 segundos.",
  "Diga uma frase de sedução para o garçom que está atendendo você Discretamente",
];

const Confetti = ({ estaAtivo }) => {
    if (!estaAtivo) return null;
    
    return (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {Array.from({ length: 150 }).map((_, indice) => {
                const aleatorio = Math.random();
                const tamanho = 5 + Math.random() * 10;
                const duracao = 4 + Math.random() * 4;
                const atraso = Math.random() * 2;
                
                return (
                    <div
                        key={indice}
                        className="absolute animate-confetti"
                        style={{
                            left: `${Math.random() * 100}vw`,
                            top: '-10px',
                            width: `${tamanho}px`,
                            height: aleatorio > 0.5 ? `${tamanho}px` : `${tamanho * 0.4}px`,
                            background: `hsl(${Math.random() * 360}deg 100% 50%)`,
                            borderRadius: aleatorio > 0.6 ? '50%' : aleatorio > 0.3 ? '0' : '3px',
                            animationDuration: `${duracao}s`,
                            animationDelay: `${atraso}s`,
                            transform: `rotate(${Math.random() * 360}deg)`,
                        }}
                    />
                );
            })}
        </div>
    );
};

const InfoCreditos = () => (
    <div className="space-y-4 text-purple-100">
        <div className="space-y-2">
            <h3 className="text-xl font-bold text-pink-400">Desenvolvido por Marcelo Guimarães</h3>
            <p className="text-sm opacity-90">Um joguinho caliente para brincar com grupos selecionados</p>
        </div>
        
        <div className="space-y-1">
            <h4 className="font-semibold text-pink-400">Formação Acadêmica:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Análise & Desenvolvimento de Sistemas</li>
                <li>Gestão Comercial</li>
                <li>Pós-Graduação em IA, Machine Learning & Deep Learning</li>
            </ul>
        </div>

        <div className="space-y-2">
            <h4 className="font-semibold text-pink-400">Atuação Profissional:</h4>
            <p className="text-sm">Programador Fullstack Sênior</p>
        </div>

        <div className="space-y-2">
            <h4 className="font-semibold text-pink-400">Contatos:</h4>
            <div className="flex gap-4">
                <a 
                    href="https://wa.me/5575991674108" 
                    target="_blank" 
                    className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all"
                >
                    <MessageCircle className="h-5 w-5" />
                    WhatsApp
                </a>
                <a 
                    href="https://www.linkedin.com/in/marcelodeveloper/" 
                    target="_blank" 
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
                >
                    <Linkedin className="h-5 w-5" />
                    LinkedIn
                </a>
            </div>
        </div>
    </div>
);

// Remove/comment out the ContatosFlutuantes component

const ConfiguracaoJogo = ({ 
    perguntas, 
    consequencias, 
    consequenciasObrigatorias,
    setPerguntas,
    setConsequencias,
    setConsequenciasObrigatorias,
    modoQuatroParedes // Add this prop
}) => {
    const [novoItem, setNovoItem] = useState('');
    const [tipoSelecionado, setTipoSelecionado] = useState('perguntas');
    const [qpPerguntas, setQpPerguntas] = useState(QP_PERGUNTAS_PADRAO);
    const [qpConsequencias, setQpConsequencias] = useState(QP_CONSEQUENCIAS_PADRAO);
    const [qpObrigatorias, setQpObrigatorias] = useState(QP_CONSEQUENCIAS_OBRIGATORIAS);

    const adicionarItem = () => {
        if (!novoItem.trim()) return;
        
        if (modoQuatroParedes) {
            switch(tipoSelecionado) {
                case 'perguntas':
                    setQpPerguntas([...qpPerguntas, novoItem.trim()]);
                    break;
                case 'consequencias':
                    setQpConsequencias([...qpConsequencias, novoItem.trim()]);
                    break;
                case 'obrigatorias':
                    setQpObrigatorias([...qpObrigatorias, novoItem.trim()]);
                    break;
            }
        } else {
            switch(tipoSelecionado) {
                case 'perguntas':
                    setPerguntas([...perguntas, novoItem.trim()]);
                    break;
                case 'consequencias':
                    setConsequencias([...consequencias, novoItem.trim()]);
                    break;
                case 'obrigatorias':
                    setConsequenciasObrigatorias([...consequenciasObrigatorias, novoItem.trim()]);
                    break;
            }
        }
        setNovoItem('');
    };

    const removerItem = (tipo, index) => {
        if (modoQuatroParedes) {
            switch(tipo) {
                case 'perguntas':
                    setQpPerguntas(qpPerguntas.filter((_, i) => i !== index));
                    break;
                case 'consequencias':
                    setQpConsequencias(qpConsequencias.filter((_, i) => i !== index));
                    break;
                case 'obrigatorias':
                    setQpObrigatorias(qpObrigatorias.filter((_, i) => i !== index));
                    break;
            }
        } else {
            switch(tipo) {
                case 'perguntas':
                    setPerguntas(perguntas.filter((_, i) => i !== index));
                    break;
                case 'consequencias':
                    setConsequencias(consequencias.filter((_, i) => i !== index));
                    break;
                case 'obrigatorias':
                    setConsequenciasObrigatorias(consequenciasObrigatorias.filter((_, i) => i !== index));
                    break;
            }
        }
    };

    const listasAtivas = modoQuatroParedes 
        ? { 
            perguntas: qpPerguntas, 
            consequencias: qpConsequencias, 
            obrigatorias: qpObrigatorias 
        }
        : { 
            perguntas, 
            consequencias, 
            consequenciasObrigatorias 
        };

    return (
        <div className="space-y-6 text-purple-100">
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-pink-400">
                    Modo: {modoQuatroParedes ? "Quatro Paredes 🔥" : "Barzinho 🍺"}
                </h3>
            </div>

            <div className="space-y-4">
                <div className="flex gap-2">
                    <Input
                        value={novoItem}
                        onChange={(e) => setNovoItem(e.target.value)}
                        placeholder="Novo item..."
                        className="bg-purple-950/50 border-purple-500/30 text-purple-100"
                    />
                    <select 
                        value={tipoSelecionado}
                        onChange={(e) => setTipoSelecionado(e.target.value)}
                        className="bg-purple-950/50 border-purple-500/30 text-purple-100 rounded-md px-2"
                    >
                        <option value="perguntas">Perguntas</option>
                        <option value="consequencias">Consequências</option>
                        <option value="obrigatorias">Obrigatórias</option>
                    </select>
                    <Button 
                        onClick={adicionarItem}
                        className="bg-pink-600 hover:bg-pink-500"
                    >
                        <Plus className="h-5 w-5" />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {Object.entries(listasAtivas).map(([tipo, lista]) => (
                    <div key={tipo} className="space-y-2">
                        <h3 className="font-semibold text-pink-400">
                            {tipo.charAt(0).toUpperCase() + tipo.slice(1)}:
                        </h3>
                        <ScrollArea className="h-32 border border-purple-500/30 rounded-md p-2">
                            {lista.map((item, index) => (
                                <div key={index} className="flex justify-between items-center py-1">
                                    <span className="text-sm">{item}</span>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => removerItem(tipo, index)}
                                        className="text-purple-400 hover:text-purple-100"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </ScrollArea>
                    </div>
                ))}
            </div>
        </div>
    );
};

const JogoVerdadeConsequencia = () => {
    const [jogadores, setJogadores] = useState([]);
    const [novoJogador, setNovoJogador] = useState('');
    const [perguntador, setPerguntador] = useState(null);
    const [respondedor, setRespondedor] = useState(null);
    const [mostrarConfetes, setMostrarConfetes] = useState(false);
    const [consequenciaObrigatoria, setConsequenciaObrigatoria] = useState(false);
    const [perguntaSugerida, setPerguntaSugerida] = useState(null);
    const [consequenciaSugerida, setConsequenciaSugerida] = useState(null);
    const [perguntas, setPerguntas] = useState(PERGUNTAS_PADRAO);
    const [consequencias, setConsequencias] = useState(CONSEQUENCIAS_PADRAO);
    const [consequenciasObrigatorias, setConsequenciasObrigatorias] = useState(CONSEQUENCIAS_OBRIGATORIAS);
    const [modoQuatroParedes, setModoQuatroParedes] = useState(true);

    const adicionarJogador = (evento) => {
        evento.preventDefault();
        if (novoJogador.trim()) {
            setJogadores(jogadoresAtuais => [...jogadoresAtuais, novoJogador.trim()]);
            setNovoJogador('');
        }
    };

    const removerJogador = (indice) => {
        setJogadores(jogadoresAtuais => 
            jogadoresAtuais.filter((_, i) => i !== indice)
        );
    };

    const iniciarRodada = () => {
        if (jogadores.length < 2) return;
        
        setMostrarConfetes(false);

        const perguntasAtuais = modoQuatroParedes ? QP_PERGUNTAS_PADRAO : perguntas;
        const consequenciasAtuais = modoQuatroParedes ? QP_CONSEQUENCIAS_PADRAO : consequencias;
        const consequenciasObrigatoriasAtuais = modoQuatroParedes ? QP_CONSEQUENCIAS_OBRIGATORIAS : consequenciasObrigatorias;

        const jogadorPerguntador = jogadores[Math.floor(Math.random() * jogadores.length)];
        setPerguntador(jogadorPerguntador);
        
        const jogadoresDisponiveis = jogadores.filter(j => j !== jogadorPerguntador);
        const jogadorRespondedor = jogadoresDisponiveis[
            Math.floor(Math.random() * jogadoresDisponiveis.length)
        ];
        setRespondedor(jogadorRespondedor);

        const ehObrigatoria = Math.random() < 0.2;
        setConsequenciaObrigatoria(ehObrigatoria);

        const perguntaAleatoria = perguntasAtuais[Math.floor(Math.random() * perguntasAtuais.length)];
        setPerguntaSugerida(perguntaAleatoria);
        
        if (ehObrigatoria) {
          const consequenciaObrigatoriaAleatoria = consequenciasObrigatoriasAtuais[
              Math.floor(Math.random() * consequenciasObrigatoriasAtuais.length)
          ];
          setConsequenciaSugerida(consequenciaObrigatoriaAleatoria);
          setMostrarConfetes(true);
      } else {
          const consequenciaAleatoria = consequenciasAtuais[
              Math.floor(Math.random() * consequenciasAtuais.length)
          ];
          setConsequenciaSugerida(consequenciaAleatoria);
      }
  };
  
  return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-pink-800 p-4 pb-20 lg:pb-4 flex items-center justify-center">
          <Confetti estaAtivo={mostrarConfetes} />
          
          <Card className="w-full max-w-lg bg-black/40 backdrop-blur-lg border-purple-500/30">
              <CardHeader className="text-center border-b border-purple-500/30">
                  {/* Cabeçalho reorganizado */}
                  <div className="flex justify-between items-center mb-4">
                      {/* Lado esquerdo - Switch modo */}
                      <div className="flex items-center space-x-2">
                          <Switch
                              id="modo"
                              checked={modoQuatroParedes}
                              onCheckedChange={setModoQuatroParedes}
                          />
                          <Label htmlFor="modo" className="text-purple-100">
                              {modoQuatroParedes ? "Quatro Paredes" : "Barzinho"}
                          </Label>
                      </div>
  
                      {/* Lado direito - Botões de configuração e info */}
                      <div className="flex gap-2">
                          <a
                              href="https://wa.me/5575991674108"
                              target="_blank"
                              className="text-purple-400 hover:text-green-500 transition-colors"
                          >
                              <MessageCircle className="h-5 w-5" />
                          </a>
                          <a
                              href="https://www.linkedin.com/in/marcelodeveloper/"
                              target="_blank"
                              className="text-purple-400 hover:text-blue-500 transition-colors"
                          >
                              <Linkedin className="h-5 w-5" />
                          </a>
                          <Dialog>
                              <DialogTrigger asChild>
                                  <Button 
                                      variant="ghost" 
                                      size="icon"
                                      className="text-purple-400 hover:text-purple-100"
                                  >
                                      <Settings className="h-5 w-5" />
                                  </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-black/90 backdrop-blur border-purple-500/30 max-h-[80vh] overflow-auto">
                                  <DialogHeader>
                                      <DialogTitle className="text-purple-100">Configurações</DialogTitle>
                                  </DialogHeader>
                                  <ConfiguracaoJogo 
                                      perguntas={perguntas}
                                      consequencias={consequencias}
                                      consequenciasObrigatorias={consequenciasObrigatorias}
                                      setPerguntas={setPerguntas}
                                      setConsequencias={setConsequencias}
                                      setConsequenciasObrigatorias={setConsequenciasObrigatorias}
                                      modoQuatroParedes={modoQuatroParedes} // Add this prop
                                  />
                              </DialogContent>
                          </Dialog>
  
                          <Dialog>
                              <DialogTrigger asChild>
                                  <Button 
                                      variant="ghost" 
                                      size="icon"
                                      className="text-purple-400 hover:text-purple-100"
                                  >
                                      <Info className="h-5 w-5" />
                                  </Button>
                              </DialogTrigger>
                              <DialogContent className="bg-black/90 backdrop-blur border-purple-500/30">
                                  <DialogHeader>
                                      <DialogTitle className="text-purple-100">Sobre o Jogo</DialogTitle>
                                  </DialogHeader>
                                  <InfoCreditos />
                              </DialogContent>
                          </Dialog>
                      </div>
                  </div>
  
                  {/* Título centralizado abaixo dos controles */}
                  <CardTitle className="text-3xl font-bold text-purple-100 flex items-center justify-center gap-2">
                      <Wine className="h-8 w-8 text-pink-400" />
                      Verdade ou Consequência
                  </CardTitle>
              </CardHeader>
              
              <CardContent className="p-6 space-y-6">
                  <div className="flex gap-2">
                      <Input
                          value={novoJogador}
                          onChange={(e) => setNovoJogador(e.target.value)}
                          placeholder="Nome do jogador..."
                          className="bg-purple-950/50 border-purple-500/30 text-purple-100"
                      />
                      <Button 
                          onClick={adicionarJogador}
                          className="bg-pink-600 hover:bg-pink-500"
                      >
                          <Plus className="h-5 w-5" />
                      </Button>
                  </div>
  
                  <ScrollArea className="h-32 border border-purple-500/30 rounded-md p-4">
                      <div className="space-y-2">
                          {jogadores.map((jogador, indice) => (
                              <div 
                                  key={indice} 
                                  className="flex justify-between items-center bg-purple-950/30 p-2 rounded"
                              >
                                  <span className="text-purple-100">{jogador}</span>
                                  <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => removerJogador(indice)}
                                      className="text-purple-400 hover:text-purple-100"
                                  >
                                      <X className="h-4 w-4" />
                                  </Button>
                              </div>
                          ))}
                      </div>
                  </ScrollArea>
  
                  <Button
                      onClick={iniciarRodada}
                      disabled={jogadores.length < 2}
                      className="w-full h-14 text-lg bg-gradient-to-r from-purple-600 to-pink-600 
                          hover:from-purple-500 hover:to-pink-500 transition-all duration-300"
                  >
                      Iniciar Rodada!
                  </Button>
  
                  {(perguntador && respondedor) && (
                      <div className="space-y-4 text-center animate-fadeIn">
                          <div className="space-y-4 p-4 bg-purple-950/30 rounded-lg border border-purple-500/30">
                              <div className="flex items-center justify-center gap-2 text-xl text-purple-100">
                                  <span className="animate-slideIn">{perguntador}</span>
                                  <span className="text-pink-400">pergunta para</span>
                                  <span className="animate-slideIn">{respondedor}</span>
                              </div>
                              
                              {consequenciaObrigatoria ? (
                                  <div className="space-y-4">
                                      <Badge className="bg-pink-600 text-lg px-4 py-2 animate-bounce">
                                          Consequência Obrigatória!
                                      </Badge>
                                      <div className="p-4 bg-pink-900/50 rounded-lg">
                                          <p className="text-xl font-bold text-purple-100">
                                              {consequenciaSugerida}
                                          </p>
                                      </div>
                                  </div>
                              ) : (
                                  <div className="grid gap-4">
                                      <div className="space-y-2">
                                          <h3 className="text-lg font-semibold text-purple-100">
                                              Verdade:
                                          </h3>
                                          <div className="p-2 bg-purple-950/50 rounded-lg text-purple-100">
                                              {perguntaSugerida}
                                          </div>
                                      </div>
                                      
                                      <div className="space-y-2">
                                          <h3 className="text-lg font-semibold text-purple-100">
                                              Consequência:
                                          </h3>
                                          <div className="p-2 bg-purple-950/50 rounded-lg text-purple-100">
                                              {consequenciaSugerida}
                                          </div>
                                      </div>
                                  </div>
                              )}
                          </div>
                      </div>
                  )}
              </CardContent>
          </Card>
  
          <style jsx global>{`
              @keyframes confetti {
                  0% {
                      transform: translateY(0) rotate(0deg);
                      opacity: 1;
                  }
                  25% {
                      transform: translateY(25vh) translateX(100px) rotate(180deg);
                      opacity: 1;
                  }
                  50% {
                      transform: translateY(50vh) translateX(-100px) rotate(360deg);
                      opacity: 0.8;
                  }
                  75% {
                      transform: translateY(75vh) translateX(50px) rotate(720deg);
                      opacity: 0.6;
                  }
                  100% {
                      transform: translateY(100vh) translateX(-50px) rotate(900deg);
                      opacity: 0;
                  }
              }
              .animate-confetti {
                  animation: confetti 4s ease-in-out forwards;
              }
              
              @keyframes confettiY {
                  0% { 
                      transform: translateY(0);
                      opacity: 1;
                  }
                  100% { 
                      transform: translateY(100vh);
                      opacity: 0;
                  }
              }
              @keyframes confettiX {
                  0% { transform: translateX(0); }
                  25% { transform: translateX(var(--balanco)); }
                  50% { transform: translateX(0); }
                  75% { transform: translateX(calc(var(--balanco) * -1)); }
                  100% { transform: translateX(0); }
              }
              @keyframes confettiRotate {
                  from { transform: rotate(0deg); }
                  to { transform: rotate(360deg); }
              }
              @keyframes slideIn {
                  from { transform: translateY(20px); opacity: 0; }
                  to { transform: translateY(0); opacity: 1; }
              }
              @keyframes fadeIn {
                  from { opacity: 0; }
                  to { opacity: 1; }
              }
              .animate-slideIn {
                  animation: slideIn 0.5s ease-out forwards;
              }
              .animate-fadeIn {
                  animation: fadeIn 0.5s ease-out forwards;
              }
          `}</style>
      </div>
  );
  };
  
  export default JogoVerdadeConsequencia;