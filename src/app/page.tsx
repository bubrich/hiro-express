import React from 'react';
import { Header } from '@/components/Header';
import { MenuSection } from '@/components/MenuSection';
import { PWAInstaller, PWANotifications } from '@/components/PWAInstaller';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  MapPin,
  Phone,
  Star,
  Truck,
  Shield,
  Utensils,
  Send,
  Instagram,
  Facebook
} from 'lucide-react';
import { restaurantInfo } from '@/data/menu';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Героическая секция */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=1920&h=1080&fit=crop)',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <div className="bg-red-600 text-white w-20 h-20 rounded-full flex items-center justify-center font-bold text-4xl mx-auto mb-6">
            寿
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Sushi <span className="text-red-500">HIRO</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Аутентичная японская кухня в сердце Москвы.
            Свежие ингредиенты, традиционные рецепты, современная подача.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg"
              onClick={() => document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Смотреть меню
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg"
              onClick={() => window.open(`https://t.me/${restaurantInfo.socialMedia.telegram?.replace('@', '')}`, '_blank')}
            >
              <Send className="mr-2 h-5 w-5" />
              Заказать в Telegram
            </Button>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Utensils className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle>Свежие ингредиенты</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Используем только свежайшие морепродукты и качественные ингредиенты,
                  доставляемые ежедневно от проверенных поставщиков.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle>Быстрая доставка</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Доставляем заказы в течение 30-45 минут. Специальная упаковка
                  сохраняет свежесть и температуру блюд.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-red-600" />
                </div>
                <CardTitle>Гарантия качества</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Если что-то пошло не так - мы вернем деньги или приготовим заказ заново.
                  Ваше удовлетворение - наш приоритет.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Меню */}
      <MenuSection />

      {/* О нас */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">О ресторане</h2>
              <p className="text-lg text-gray-600 mb-6">
                {restaurantInfo.description}
              </p>
              <p className="text-gray-600 mb-8">
                Наши шеф-повара имеют многолетний опыт работы в лучших японских ресторанах
                и используют только традиционные техники приготовления. Мы гордимся тем,
                что можем предложить нашим гостям настоящий вкус Японии.
              </p>

              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Star className="text-yellow-500" />
                  <span className="text-gray-700">Более 1000 довольных клиентов</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Badge className="bg-green-500">
                    4.9
                  </Badge>
                  <span className="text-gray-700">Рейтинг на основе отзывов</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1579952363873-27d3bfad9c0d?w=600&h=400&fit=crop"
                alt="Шеф-повар готовит суши"
                className="rounded-lg shadow-lg w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <p className="text-2xl font-bold text-gray-900">5+</p>
                <p className="text-sm text-gray-600">лет опыта</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Доставка */}
      <section id="delivery" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Доставка и оплата</h2>
            <p className="text-xl text-gray-600">
              Удобные способы заказа и быстрая доставка по Москве
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-red-600" />
                  Условия доставки
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Минимальная сумма заказа:</span>
                  <Badge>₽800</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Стоимость доставки:</span>
                  <Badge variant="secondary">₽200</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Бесплатная доставка от:</span>
                  <Badge className="bg-green-500">₽1500</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>Время доставки:</span>
                  <Badge variant="outline">30-45 мин</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-red-600" />
                  Как заказать
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Badge className="bg-red-600 text-white">1</Badge>
                  <div>
                    <p className="font-medium">Выберите блюда</p>
                    <p className="text-sm text-gray-600">Добавьте понравившиеся позиции в корзину</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge className="bg-red-600 text-white">2</Badge>
                  <div>
                    <p className="font-medium">Оформите заказ</p>
                    <p className="text-sm text-gray-600">Укажите контактные данные и адрес доставки</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Badge className="bg-red-600 text-white">3</Badge>
                  <div>
                    <p className="font-medium">Получите заказ</p>
                    <p className="text-sm text-gray-600">Курьер доставит заказ в указанное время</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section id="contacts" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Контакты</h2>
            <p className="text-xl text-gray-600">
              Свяжитесь с нами любым удобным способом
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Телефон</h3>
                      <p className="text-gray-600">{restaurantInfo.phone}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Адрес</h3>
                      <p className="text-gray-600">{restaurantInfo.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">Режим работы</h3>
                      <div className="space-y-1">
                        {Object.entries(restaurantInfo.workingHours).map(([day, hours]) => (
                          <div key={day} className="flex justify-between text-sm">
                            <span className="text-gray-600">{day}:</span>
                            <span className="text-gray-900">{hours}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex space-x-4">
                {restaurantInfo.socialMedia.telegram && (
                  <Button
                    asChild
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    <a
                      href={`https://t.me/${restaurantInfo.socialMedia.telegram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Telegram
                    </a>
                  </Button>
                )}
                {restaurantInfo.socialMedia.instagram && (
                  <Button
                    asChild
                    variant="outline"
                  >
                    <a
                      href={`https://instagram.com/${restaurantInfo.socialMedia.instagram.replace('@', '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="w-4 h-4 mr-2" />
                      Instagram
                    </a>
                  </Button>
                )}
              </div>
            </div>

            <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Карта будет здесь</p>
                <p className="text-sm text-gray-400">
                  {restaurantInfo.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PWA компоненты */}
      <PWAInstaller />
      <div className="container mx-auto px-4 py-4">
        <PWANotifications />
      </div>

      {/* Футер */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-xl">
                  寿
                </div>
                <div>
                  <h3 className="text-xl font-bold">Sushi HIRO</h3>
                  <p className="text-sm text-gray-400">Японская кухня</p>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Аутентичная японская кухня с доставкой по Москве.
                Свежие ингредиенты и традиционные рецепты.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {restaurantInfo.phone}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {restaurantInfo.address}
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Социальные сети</h4>
              <div className="flex space-x-4">
                {restaurantInfo.socialMedia.telegram && (
                  <a
                    href={`https://t.me/${restaurantInfo.socialMedia.telegram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Send className="w-6 h-6" />
                  </a>
                )}
                {restaurantInfo.socialMedia.instagram && (
                  <a
                    href={`https://instagram.com/${restaurantInfo.socialMedia.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Sushi HIRO. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
