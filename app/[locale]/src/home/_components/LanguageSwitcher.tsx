'use client';

import {useLocale, useTranslations} from 'next-intl';
import {useRouter, usePathname} from '../../../../../i18n/routing';
import {useState, useTransition} from 'react';

export default function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      router.replace(pathname, {locale: nextLocale});
    });
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
      >
        <span>{t('switchLanguage')}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-10">
          <button
            onClick={() => onSelectChange('es')}
            className={`w-full text-left px-4 py-2 hover:bg-gray-100 rounded-t-lg ${
              locale === 'es' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
            }`}
          >
            🇪🇸 {t('spanish')}
          </button>
          <button
            onClick={() => onSelectChange('en')}
            className={`w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg ${
              locale === 'en' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
            }`}
          >
            🇺🇸 {t('english')}
          </button>
        </div>
      )}
    </div>
  );
}
