import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import RegisterModal from './RegisterModal';
import { config } from "@/config";
interface EnhancedLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EnhancedLoginModal: React.FC<EnhancedLoginModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(username, password);
      
      if (success) {
        toast({
          title: "เข้าสู่ระบบสำเร็จ",
          description: `ยินดีต้อนรับ ${username}`,
        });
        onClose();
        setUsername('');
        setPassword('');
      } else {
        toast({
          title: "เข้าสู่ระบบไม่สำเร็จ",
          description: "กรุณาตรวจสอบชื่อผู้ใช้และรหัสผ่าน",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถเข้าสู่ระบบได้",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
const handleLineLogin = () => {
  window.location.href = config.LineLoginURL;
};

// Registor

const openRegisterModal = () => {
    setIsRegisterOpen(true);
    onClose(); // ปิด LoginModal
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-brand-green">
              <LogIn className="w-5 h-5" />
              เข้าสู่ระบบ
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">ชื่อผู้ใช้</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="กรอกชื่อผู้ใช้"
                required
                className="border-brand-green/30 focus:border-brand-green"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">รหัสผ่าน</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="กรอกรหัสผ่าน"
                  required
                  className="border-brand-green/30 focus:border-brand-green pr-10"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 text-gray-500" />
                  ) : (
                    <Eye className="w-4 h-4 text-gray-500" />
                  )}
                </Button>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1 border-brand-green/30 text-brand-green hover:bg-brand-green/10"
              >
                ยกเลิก
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 brand-green text-white hover:opacity-90"
              >
                {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
              </Button>
            </div>
          </form>

          <p className="font-medium mb-1 flex justify-center items-center">
            <span className="mx-2">เข้าสู่ระบบด้วย</span>
            <button
              onClick={() => alert("Guest clicked")}
              className="text-brand-green text-blue-500 hover:underline focus:outline-none"
            >
              Guest
            </button>
            <span className="mx-2">หรือ</span>
            <button
              onClick={openRegisterModal}
              className="text-brand-green text-blue-500 hover:underline focus:outline-none"
            >
              ลงทะเบียนสมาชิกใหม่ !
            </button>
          </p>
          <div className="text-center text-xs text-gray-500 mt-4 p-3 bg-gray-50 rounded-lg">
            <div className="pt-2">
              <Button
                type="button"
                onClick={handleLineLogin}
                variant="outline"
                className="w-full flex items-center justify-center gap-2 border-green-500 text-green-600 hover:bg-green-50"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/41/LINE_logo.svg"
                  alt="LINE"
                  className="w-5 h-5"
                />
                เข้าสู่ระบบด้วย LINE
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* แสดง RegisterModal */}
      <RegisterModal isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} username={username} />
    </>
  );
};

export default EnhancedLoginModal;
