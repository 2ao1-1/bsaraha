import { Shield } from "lucide-react";

export default function AdminSecurityNotice() {
  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
      <p className="flex items-center gap-2">
        <Shield size={16} />
        <strong>تنبيه أمني:</strong>
      </p>
      <p className="text-xs mt-1">
        هذه الصفحة مخصصة للالمدراء فقط. جميع محاولات الدخول يتم تسجيلها.
      </p>
    </div>
  );
}
