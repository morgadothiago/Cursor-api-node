import {
  Clock,
  LogIn,
  UserPlus,
  BarChart2,
  Users,
  Zap,
  LayoutDashboard,
  LayoutDashboardIcon,
} from "lucide-react"
import React from "react"
import { Link } from "react-router-dom"

export default function LadingPage() {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 min-h-screen">
      <header className="container mx-auto flex items-center justify-between w-full h-24 px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-3 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300">
            <Clock size={32} className="text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
              Pointfy
            </h1>
            <p className="text-sm font-medium text-gray-600">
              Gerencie seu tempo e seus ganhos
            </p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav
          className="flex items-center gap-4"
          role="navigation"
          aria-label="Navegação principal"
        >
          <Link
            to="/signin"
            className="flex items-center gap-2 bg-white border border-blue-200 text-blue-600 px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 text-sm sm:text-base group"
          >
            <LogIn
              size={18}
              className="sm:w-5 sm:h-5 group-hover:scale-110 transition-transform"
            />
            <span className="font-medium hidden sm:inline">Entrar</span>
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-8 py-24" id="home">
        <div className="text-center max-w-4xl mx-auto">
          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 inline-block animate-fade-in-up">
            ✨ Revolucione sua gestão de tempo
          </span>
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            Simplifique o controle do seu tempo e{" "}
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
              maximize seus resultados
            </span>
          </h2>
          <p
            className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-12 leading-relaxed animate-fade-in-up px-4 sm:px-0"
            style={{ animationDelay: "400ms" }}
          >
            Uma plataforma completa e intuitiva para gerenciar seus horários,
            aumentar sua produtividade e alcançar o sucesso profissional
          </p>
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 animate-fade-in-up"
            style={{ animationDelay: "600ms" }}
          >
            <Link
              to="/register"
              className="group bg-gradient-to-r from-blue-600 to-blue-500 text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:translate-y-[-2px] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-200 font-medium relative overflow-hidden w-full sm:w-auto text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Criar conta gratuita"
            >
              <span className="relative z-10">Começar Gratuitamente</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              to="/demo"
              className="group text-gray-700 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-white/50 transition-all duration-300 font-medium flex items-center justify-center gap-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              aria-label="Ver demonstração do produto"
            >
              <span>Ver demonstração</span>
              <span
                className="group-hover:translate-x-1 transition-transform duration-300"
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </main>

      <section className="bg-white py-16 sm:py-24">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 inline-block">
              Recursos poderosos
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Tudo que você precisa em um só lugar
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 px-4 sm:px-0">
              Ferramentas inteligentes para otimizar sua gestão de tempo
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <Clock size={28} />,
                title: "Controle de Horários",
                description:
                  "Registre e gerencie seus horários com precisão e evite conflitos de agenda",
              },
              {
                icon: <BarChart2 size={28} />,
                title: "Análise de Produtividade",
                description:
                  "Visualize métricas e insights para otimizar seu desempenho",
              },
              {
                icon: <Zap size={28} />,
                title: "Automação Inteligente",
                description:
                  "Automatize tarefas repetitivas e foque no que realmente importa",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-4px] border border-gray-100 animate-fade-in-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 rounded-xl mb-6 w-fit">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto">
            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 inline-block">
              O que oferecemos
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Transforme sua gestão de tempo em resultados reais
            </h2>
            <p className="text-xl text-gray-600 mb-12">
              O Pointfy é uma plataforma completa que ajuda profissionais e
              empresas a:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  ⏰ Controle de Tempo
                </h3>
                <p className="text-gray-600">
                  Registre horas, gerencie projetos e monitore a produtividade
                  da sua equipe em tempo real
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  💰 Gestão Financeira
                </h3>
                <p className="text-gray-600">
                  Calcule custos, gere relatórios e maximize seus ganhos com
                  base nas horas trabalhadas
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  📊 Análise de Dados
                </h3>
                <p className="text-gray-600">
                  Visualize métricas importantes e tome decisões baseadas em
                  dados concretos
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  🤝 Integração Total
                </h3>
                <p className="text-gray-600">
                  Conecte com suas ferramentas favoritas e mantenha todos os
                  processos sincronizados
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-gradient-to-br from-blue-50 to-white py-24">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6 inline-block">
                  Por que escolher o Pointfy?
                </span>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Uma solução completa para{" "}
                  <span className="bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
                    profissionais e empresas
                  </span>
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Users className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Para Todos os Tamanhos
                      </h3>
                      <p className="text-gray-600">
                        Seja você um profissional autônomo ou uma grande
                        empresa, nossa plataforma se adapta às suas
                        necessidades.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <Zap className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        Integração Simplificada
                      </h3>
                      <p className="text-gray-600">
                        Conecte-se facilmente com suas ferramentas favoritas e
                        mantenha tudo sincronizado.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Comece Agora Mesmo
                    </h3>
                    <p className="text-gray-600">
                      Escolha o plano ideal para suas necessidades
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <span className="font-medium text-gray-900">
                        Plano Básico
                      </span>
                      <span className="text-blue-600 font-semibold">
                        Grátis
                      </span>
                    </div>
                  </div>
                  <Link
                    to="/signup"
                    className="block w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-xl font-medium hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 text-center"
                  >
                    Começar Gratuitamente
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-blue-600 py-24">
        <div className="container mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Pronto para transformar sua gestão de tempo?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Deixe seus dados e nossa equipe entrará em contato para uma
              demonstração personalizada
            </p>
          </div>

          <div className="max-w-xl mx-auto bg-white rounded-2xl p-8 shadow-xl">
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nome completo
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Digite seu nome"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  E-mail profissional
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Empresa
                </label>
                <input
                  type="text"
                  id="company"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Nome da sua empresa"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="(00) 00000-0000"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 rounded-xl font-medium hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300"
              >
                Solicitar Demonstração
              </button>

              <p className="text-sm text-gray-500 text-center">
                Ao enviar, você concorda com nossos{" "}
                <Link to="/terms" className="text-blue-600 hover:text-blue-700">
                  Termos de Serviço
                </Link>{" "}
                e{" "}
                <Link
                  to="/privacy"
                  className="text-blue-600 hover:text-blue-700"
                >
                  Política de Privacidade
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-3 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300">
                  <Clock size={32} className="text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold">Pointfy</span>
                  <span className="text-sm text-gray-400">
                    Transformando tempo em resultados
                  </span>
                </div>
              </div>
              <p className="text-gray-400 mb-6">
                Sua plataforma completa para gestão de tempo e produtividade.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Pointfy. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link
                to="/twitter"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </Link>
              <Link
                to="/github"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
              <Link
                to="/dribbble"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c5.51 0 10-4.48 10-10S17.51 2 12 2zm6.605 4.61a8.502 8.502 0 011.93 5.314c-.281-.054-3.101-.629-5.943-.271-.065-.141-.12-.293-.184-.445a25.416 25.416 0 00-.564-1.236c3.145-1.28 4.577-3.124 4.761-3.362zM12 3.475c2.17 0 4.154.813 5.662 2.148-.152.216-1.443 1.941-4.48 3.08-1.399-2.57-2.95-4.675-3.189-5A8.687 8.687 0 0112 3.475zm-3.633.803a53.896 53.896 0 013.167 4.935c-3.992 1.063-7.517 1.04-7.896 1.04a8.581 8.581 0 014.729-5.975zM3.453 12.01v-.26c.37.01 4.512.065 8.775-1.215.25.477.477.965.694 1.453-.109.033-.228.065-.336.098-4.404 1.42-6.747 5.303-6.942 5.629a8.522 8.522 0 01-2.19-5.705zM12 20.547a8.482 8.482 0 01-5.239-1.8c.152-.315 1.888-3.656 6.703-5.337.022-.01.033-.01.054-.022a35.318 35.318 0 011.823 6.475 8.4 8.4 0 01-3.341.684zm4.761-1.465c-.086-.52-.542-3.015-1.659-6.084 2.679-.423 5.022.271 5.314.369a8.468 8.468 0 01-3.655 5.715z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
