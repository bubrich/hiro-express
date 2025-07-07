'use client';

import React, { useState, useEffect } from 'react';
import { MenuItem, Category, TelegramBotConfig } from '@/types';
import { menuItems as initialMenuItems, categories as initialCategories } from '@/data/menu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import {
  Settings,
  Plus,
  Edit,
  Trash2,
  Save,
  Eye,
  EyeOff,
  Send,
  Menu as MenuIcon
} from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [telegramConfig, setTelegramConfig] = useState<TelegramBotConfig>({
    botToken: '',
    chatId: '',
    isEnabled: false,
  });
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Простая аутентификация (в реальном проекте нужна более безопасная система)
  const handleLogin = () => {
    if (password === 'sushi2025') {
      setIsAuthenticated(true);
      loadAdminData();
    } else {
      alert('Неверный пароль');
    }
  };

  const loadAdminData = () => {
    // Загружаем сохраненные данные из localStorage
    const savedMenuItems = localStorage.getItem('admin-menu-items');
    const savedCategories = localStorage.getItem('admin-categories');
    const savedTelegramConfig = localStorage.getItem('admin-telegram-config');

    if (savedMenuItems) {
      setMenuItems(JSON.parse(savedMenuItems));
    }

    if (savedCategories) {
      setCategories(JSON.parse(savedCategories));
    }

    if (savedTelegramConfig) {
      setTelegramConfig(JSON.parse(savedTelegramConfig));
    }
  };

  const saveData = () => {
    localStorage.setItem('admin-menu-items', JSON.stringify(menuItems));
    localStorage.setItem('admin-categories', JSON.stringify(categories));
    localStorage.setItem('admin-telegram-config', JSON.stringify(telegramConfig));
    alert('Данные сохранены!');
  };

  const handleItemSave = (item: MenuItem) => {
    if (editingItem && editingItem.id) {
      // Редактирование существующего товара
      setMenuItems(prev => prev.map(i => i.id === item.id ? item : i));
    } else {
      // Добавление нового товара
      const newItem = { ...item, id: Date.now().toString() };
      setMenuItems(prev => [...prev, newItem]);
    }
    setEditingItem(null);
    setIsDialogOpen(false);
  };

  const handleItemDelete = (itemId: string) => {
    if (confirm('Удалить этот товар?')) {
      setMenuItems(prev => prev.filter(i => i.id !== itemId));
    }
  };

  const handleItemToggle = (itemId: string) => {
    setMenuItems(prev => prev.map(i =>
      i.id === itemId ? { ...i, available: !i.available } : i
    ));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="bg-red-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl mx-auto mb-4">
              寿
            </div>
            <CardTitle>Админ-панель Sushi HIRO</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin} className="w-full bg-red-600 hover:bg-red-700">
              Войти
            </Button>
            <p className="text-xs text-gray-500 text-center">
              Демо пароль: sushi2025
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Шапка админки */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg">
                寿
              </div>
              <div>
                <h1 className="text-xl font-bold">Админ-панель Sushi HIRO</h1>
                <p className="text-sm text-gray-500">Управление меню и настройками</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={saveData} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                Сохранить
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open('/', '_blank')}
              >
                Открыть сайт
              </Button>
              <Button
                variant="outline"
                onClick={() => setIsAuthenticated(false)}
              >
                Выйти
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="menu" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="menu" className="flex items-center gap-2">
              <MenuIcon className="w-4 h-4" />
              Меню
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Категории
            </TabsTrigger>
            <TabsTrigger value="telegram" className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Telegram
            </TabsTrigger>
          </TabsList>

          {/* Управление меню */}
          <TabsContent value="menu" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Управление меню</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-red-600 hover:bg-red-700"
                    onClick={() => {
                      setEditingItem({
                        id: '',
                        name: '',
                        description: '',
                        price: 0,
                        image: '',
                        category: categories[0]?.id || '',
                        available: true,
                        ingredients: [],
                      });
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить товар
                  </Button>
                </DialogTrigger>
                <MenuItemDialog
                  item={editingItem}
                  categories={categories}
                  onSave={handleItemSave}
                  onClose={() => {
                    setIsDialogOpen(false);
                    setEditingItem(null);
                  }}
                />
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <Card key={item.id} className={`${!item.available ? 'opacity-60' : ''}`}>
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      {item.isPopular && (
                        <Badge className="bg-red-500">Популярно</Badge>
                      )}
                      {!item.available && (
                        <Badge variant="secondary">Скрыто</Badge>
                      )}
                    </div>
                  </div>

                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold">{item.name}</h3>
                      <span className="font-bold text-red-600">₽{item.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="outline" className="text-xs">
                        {categories.find(c => c.id === item.category)?.name}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleItemToggle(item.id)}
                        >
                          {item.available ?
                            <Eye className="w-4 h-4" /> :
                            <EyeOff className="w-4 h-4" />
                          }
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            setEditingItem(item);
                            setIsDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleItemDelete(item.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Управление категориями */}
          <TabsContent value="categories" className="space-y-6">
            <h2 className="text-2xl font-bold">Управление категориями</h2>
            <div className="grid gap-4">
              {categories.map((category) => (
                <Card key={category.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold">{category.name}</h3>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                      <Badge>
                        {menuItems.filter(i => i.category === category.id).length} товаров
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Настройки Telegram */}
          <TabsContent value="telegram" className="space-y-6">
            <h2 className="text-2xl font-bold">Настройки Telegram</h2>
            <Card>
              <CardHeader>
                <CardTitle>Конфигурация бота</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={telegramConfig.isEnabled}
                    onCheckedChange={(checked) =>
                      setTelegramConfig(prev => ({ ...prev, isEnabled: checked }))
                    }
                  />
                  <Label>Включить Telegram бота</Label>
                </div>

                <div>
                  <Label htmlFor="bot-token">Токен бота</Label>
                  <Input
                    id="bot-token"
                    type="password"
                    value={telegramConfig.botToken}
                    onChange={(e) =>
                      setTelegramConfig(prev => ({ ...prev, botToken: e.target.value }))
                    }
                    placeholder="123456789:AABBCCDDEEFFGGHHIIJJKKLLMMNNOOPPQQRRss"
                  />
                </div>

                <div>
                  <Label htmlFor="chat-id">Chat ID</Label>
                  <Input
                    id="chat-id"
                    value={telegramConfig.chatId}
                    onChange={(e) =>
                      setTelegramConfig(prev => ({ ...prev, chatId: e.target.value }))
                    }
                    placeholder="-1001234567890"
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Как настроить Telegram бота:</h4>
                  <ol className="text-sm space-y-1 list-decimal list-inside">
                    <li>Откройте @BotFather в Telegram</li>
                    <li>Отправьте команду /newbot</li>
                    <li>Следуйте инструкциям для создания бота</li>
                    <li>Скопируйте токен и вставьте выше</li>
                    <li>Добавьте бота в группу или канал</li>
                    <li>Получите Chat ID группы/канала</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Компонент диалога для редактирования товара
function MenuItemDialog({
  item,
  categories,
  onSave,
  onClose
}: {
  item: MenuItem | null;
  categories: Category[];
  onSave: (item: MenuItem) => void;
  onClose: () => void;
}) {
  const [formData, setFormData] = useState<MenuItem>(
    item || {
      id: '',
      name: '',
      description: '',
      price: 0,
      image: '',
      category: categories[0]?.id || '',
      available: true,
      ingredients: [],
    }
  );

  useEffect(() => {
    if (item) {
      setFormData(item);
    }
  }, [item]);

  const handleSave = () => {
    if (!formData.name || !formData.description || formData.price <= 0) {
      alert('Заполните все обязательные поля');
      return;
    }
    onSave(formData);
  };

  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>
          {item?.id ? 'Редактировать товар' : 'Добавить товар'}
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-4">
        <div>
          <Label htmlFor="name">Название *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div>
          <Label htmlFor="description">Описание *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price">Цена *</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
            />
          </div>

          <div>
            <Label htmlFor="category">Категория</Label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <Label htmlFor="image">URL изображения</Label>
          <Input
            id="image"
            value={formData.image}
            onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <Label htmlFor="ingredients">Ингредиенты (через запятую)</Label>
          <Input
            id="ingredients"
            value={formData.ingredients.join(', ')}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              ingredients: e.target.value.split(',').map(i => i.trim()).filter(Boolean)
            }))}
          />
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.available}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, available: checked }))}
            />
            <Label>Доступен для заказа</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              checked={formData.isPopular || false}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPopular: checked }))}
            />
            <Label>Популярный товар</Label>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
          <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700">
            Сохранить
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
