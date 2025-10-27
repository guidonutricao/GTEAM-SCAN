import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Upload, Loader2, Send, Lightbulb, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AnalysisLoading } from "@/components/AnalysisLoading";
import gteamLogo from "@/assets/gteam-logo.png";

interface AlimentoIdentificado {
  nome: string;
  quantidade_estimada: string;
}

interface InformacaoNutricional {
  energia_kcal: number;
  proteinas_g: number;
  carboidratos_g: number;
  gorduras_g: number;
  fibras_g: number;
}

interface NutritionalData {
  alimentos_identificados?: AlimentoIdentificado[];
  informacao_nutricional_total?: InformacaoNutricional;
  interpretacao?: string;
  sugestao_de_melhoria?: string;
}

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [foodDescription, setFoodDescription] = useState<string>("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      toast({
        title: "Nenhuma imagem selecionada",
        description: "Por favor, selecione uma imagem antes de enviar.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      // Adiciona a imagem com o nome 'data' (campo binário do webhook)
      formData.append("data", selectedFile);
      // Adiciona a descrição como campo de texto
      formData.append("descricao", foodDescription.trim() || "");

      const response = await fetch("https://n8n.guidonutri.com/webhook/GTEAMSCAN", {
        method: "POST",
        body: formData,
        // Não define Content-Type, o browser faz isso automaticamente para FormData
      });

      if (!response.ok) {
        throw new Error("Erro ao processar a imagem");
      }

      const data = await response.json();

      // Debug: log the API response
      console.log("API Response:", data);
      console.log("API Response Type:", typeof data);
      console.log("API Response Keys:", Object.keys(data));

      toast({
        title: "Análise concluída!",
        description: "Sua refeição foi analisada com sucesso.",
      });

      // Navigate to report page with data
      navigate("/relatorio", { state: { data, imagePreview } });
    } catch (error) {
      toast({
        title: "Erro na análise",
        description: "Não foi possível analisar a imagem. Tente novamente.",
        variant: "destructive",
      });
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Loading Screen */}
      {loading && <AnalysisLoading />}

      <div className="min-h-screen bg-gradient-to-b from-background to-secondary flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-2xl space-y-4 sm:space-y-6">
          {/* Header */}
          <header className="text-center space-y-3 sm:space-y-4 animate-slide-up">
            <div className="flex justify-center">
              <img
                src={gteamLogo}
                alt="GTEAM Logo"
                className="h-20 sm:h-28 w-auto object-contain animate-float"
              />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-primary-glow to-primary bg-clip-text text-transparent">
                GTEAM Scan
              </h1>
              <p className="text-muted-foreground mt-1.5 sm:mt-2 text-base sm:text-lg">
                Análise nutricional inteligente
              </p>
            </div>
          </header>

          {/* Info Banner */}
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 animate-slide-up">
            {/* Tips Card */}
            <Card className="border-border shadow-elevated backdrop-blur-sm bg-card/95 border-l-4 border-l-blue-500">
              <CardHeader className="pb-2 sm:pb-3 px-4 pt-4">
                <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500 flex-shrink-0" />
                  Dicas para a Foto
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <ul className="text-xs sm:text-sm text-muted-foreground space-y-1.5 sm:space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5 flex-shrink-0">•</span>
                    <span>Use boa iluminação</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5 flex-shrink-0">•</span>
                    <span>Foco nítido no prato</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5 flex-shrink-0">•</span>
                    <span>Centralize a imagem</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5 flex-shrink-0">•</span>
                    <span>Distância média</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5 flex-shrink-0">•</span>
                    <span>Evite sombras</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Warning Card */}
            <Card className="border-border shadow-elevated backdrop-blur-sm bg-card/95 border-l-4 border-l-yellow-500">
              <CardHeader className="pb-2 sm:pb-3 px-4 pt-4">
                <CardTitle className="text-sm sm:text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 flex-shrink-0" />
                  Aviso sobre a IA
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Os resultados são <span className="font-semibold text-foreground">estimativas baseadas em IA</span> e podem conter erros.
                  Use apenas como <span className="font-semibold text-foreground">referência</span>.
                  Para orientações precisas, consulte um profissional.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Upload Card */}
          <Card className="border-border shadow-elevated backdrop-blur-sm bg-card/95">
            <CardHeader className="text-center px-4 pt-5 pb-3 sm:px-6 sm:pt-6 sm:pb-4">
              <CardTitle className="text-xl sm:text-2xl">Escaneie sua refeição</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Envie uma foto do seu prato para análise completa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-5 px-4 pb-5 sm:px-6 sm:pb-6">
              <div className="grid gap-3">
                <input
                  type="file"
                  accept="image/*"
                  id="upload-input"
                  className="hidden"
                  onChange={handleFileChange}
                  disabled={loading}
                />
                <label htmlFor="upload-input">
                  <Button
                    className="w-full h-12 sm:h-14 text-sm sm:text-base font-semibold bg-gradient-to-r from-primary to-primary-glow hover:shadow-glow transition-all cursor-pointer touch-manipulation active:scale-95"
                    asChild
                    disabled={loading}
                  >
                    <span>
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                          Analisando...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                          Escolher da Galeria
                        </>
                      )}
                    </span>
                  </Button>
                </label>

                <label htmlFor="upload-input">
                  <Button
                    variant="secondary"
                    className="w-full h-12 sm:h-14 text-sm sm:text-base font-semibold cursor-pointer touch-manipulation active:scale-95"
                    asChild
                    disabled={loading}
                  >
                    <span>
                      <Camera className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Tirar Foto
                    </span>
                  </Button>
                </label>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="animate-fade-in space-y-3 sm:space-y-4">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-48 sm:h-64 object-cover rounded-lg border border-border"
                  />

                  {/* Food Description Input */}
                  <div className="space-y-2">
                    <label htmlFor="food-description" className="text-sm font-medium text-foreground">
                      Descreva o prato (opcional)
                    </label>
                    <textarea
                      id="food-description"
                      value={foodDescription}
                      onChange={(e) => setFoodDescription(e.target.value)}
                      placeholder="Ex: macarrão com frango e legumes..."
                      disabled={loading}
                      className="w-full min-h-[80px] px-3 py-2 text-sm sm:text-base rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                      maxLength={200}
                    />
                    <p className="text-xs text-muted-foreground">
                      Ajude a IA a identificar melhor o prato descrevendo-o brevemente
                    </p>
                  </div>

                  <Button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full h-12 sm:h-14 text-sm sm:text-base font-semibold bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 hover:shadow-glow transition-all touch-manipulation active:scale-95"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                        Analisando...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                        Enviar para Análise
                      </>
                    )}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Footer */}
          <footer className="text-center">
            <p className="text-[10px] sm:text-xs text-muted-foreground">
              Tecnologia de análise alimentar por IA • GTEAM Labs
            </p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Index;
