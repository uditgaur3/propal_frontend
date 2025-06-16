'use client';

import { useState, useEffect } from 'react';
import { useNotification } from '@/contexts/notification-context';

interface STTConfig {
  stt: Array<{
    name: string;
    value: string;
    models: Array<{
      name: string;
      value: string;
      languages: Array<{
        name: string;
        value: string;
      }>;
    }>;
  }>;
}

export default function AgentPage() {
  const { showNotification } = useNotification();
  const [sttConfig, setSttConfig] = useState<STTConfig | null>(null);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Agent Configuration - proPAL AI";
    loadSTTConfig();
    loadSavedSelections();
  }, []);
  const showMessage = (text: string, type: 'success' | 'error') => {
    showNotification(text, type);
  };
  const loadSTTConfig = async () => {
    try {
      const response = await fetch('/stt.json');
      if (!response.ok) {
        throw new Error('Failed to load STT configuration');
      }
      const config = await response.json();
      setSttConfig(config);
      
      // Set default selections to first available options
      if (config.stt && config.stt.length > 0) {
        const firstProvider = config.stt[0];
        if (firstProvider && firstProvider.models.length > 0) {
          const firstModel = firstProvider.models[0];
          if (firstModel && firstModel.languages.length > 0) {
            const firstLanguage = firstModel.languages[0];
            
            // Only set defaults if nothing is saved in localStorage
            const saved = localStorage.getItem('stt-selection');
            if (!saved) {
              setSelectedProvider(firstProvider.value);
              setSelectedModel(firstModel.value);
              setSelectedLanguage(firstLanguage.value);
            }
          }
        }
      }
    } catch (error) {
      console.error('Error loading STT config:', error);
      showMessage('Failed to load STT configuration', 'error');
    } finally {
      setLoading(false);
    }
  };

  const loadSavedSelections = () => {
    const saved = localStorage.getItem('stt-selection');
    if (saved) {
      try {
        const { provider, model, language } = JSON.parse(saved);
        setSelectedProvider(provider || '');
        setSelectedModel(model || '');
        setSelectedLanguage(language || '');
      } catch (error) {
        console.error('Error loading saved selections:', error);
      }
    }
  };

  const saveSelections = (provider: string, model: string, language: string) => {
    localStorage.setItem('stt-selection', JSON.stringify({
      provider,
      model,
      language
    }));
    showMessage('Configuration saved successfully!', 'success');
  };
  const handleProviderChange = (provider: string) => {
    setSelectedProvider(provider);
    
    if (sttConfig && provider) {
      // Find the selected provider
      const selectedProviderObj = sttConfig.stt.find(p => p.value === provider);
      if (selectedProviderObj && selectedProviderObj.models.length > 0) {
        // Reset model and language when provider changes
        const firstModel = selectedProviderObj.models[0];
        setSelectedModel(firstModel.value);
        
        if (firstModel.languages.length > 0) {
          const firstLanguage = firstModel.languages[0];
          setSelectedLanguage(firstLanguage.value);
          saveSelections(provider, firstModel.value, firstLanguage.value);
        }
      }
    } else {
      setSelectedModel('');
      setSelectedLanguage('');
    }
  };
  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    
    if (sttConfig && selectedProvider && model) {
      // Find the selected provider and model
      const selectedProviderObj = sttConfig.stt.find(p => p.value === selectedProvider);
      if (selectedProviderObj) {
        const selectedModelObj = selectedProviderObj.models.find(m => m.value === model);
        if (selectedModelObj && selectedModelObj.languages.length > 0) {
          // Reset language when model changes
          const firstLanguage = selectedModelObj.languages[0];
          setSelectedLanguage(firstLanguage.value);
          saveSelections(selectedProvider, model, firstLanguage.value);
        }
      }
    } else {
      setSelectedLanguage('');
    }
  };

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language);
    if (selectedProvider && selectedModel && language) {
      saveSelections(selectedProvider, selectedModel, language);
    }
  };
  const getAvailableModels = () => {
    if (!sttConfig || !selectedProvider) return [];
    const selectedProviderObj = sttConfig.stt.find(p => p.value === selectedProvider);
    return selectedProviderObj?.models || [];
  };

  const getAvailableLanguages = () => {
    if (!sttConfig || !selectedProvider || !selectedModel) return [];
    const selectedProviderObj = sttConfig.stt.find(p => p.value === selectedProvider);
    if (selectedProviderObj) {
      const selectedModelObj = selectedProviderObj.models.find(m => m.value === selectedModel);
      return selectedModelObj?.languages || [];
    }
    return [];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-gray-600 dark:text-gray-400">Loading configuration...</span>
      </div>
    );
  }

  if (!sttConfig) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4">
        <div className="flex">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">
              Configuration Error
            </h3>
            <p className="text-sm text-red-700 mt-1">
              Unable to load STT configuration. Please check that stt.json exists and is valid.
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {/* STT Configuration */}
      <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Speech-to-Text Configuration
          </h2>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Provider Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Provider
              </label>              <select
                value={selectedProvider}
                onChange={(e) => handleProviderChange(e.target.value)}
                className="w-full text-sm px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all duration-200 hover:border-indigo-400 focus:scale-[1.02]"
              ><option value="">Select Provider</option>
                {sttConfig.stt.map((provider) => (
                  <option key={provider.value} value={provider.value}>
                    {provider.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Model Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Model
              </label>              <select
                value={selectedModel}
                onChange={(e) => handleModelChange(e.target.value)}
                disabled={!selectedProvider}
                className="w-full text-sm px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200 hover:border-indigo-400 focus:scale-[1.02] disabled:hover:border-gray-300"
              ><option value="">Select Model</option>
                {getAvailableModels().map((model) => (
                  <option key={model.value} value={model.value}>
                    {model.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Language Dropdown */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Language
              </label>              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                disabled={!selectedModel}
                className="w-full text-sm px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white disabled:bg-gray-100 disabled:cursor-not-allowed transition-all duration-200 hover:border-indigo-400 focus:scale-[1.02] disabled:hover:border-gray-300"
              ><option value="">Select Language</option>
                {getAvailableLanguages().map((language) => (
                  <option key={language.value} value={language.value}>
                    {language.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      {selectedProvider && selectedModel && selectedLanguage && (
        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-900 dark:to-blue-900 border border-indigo-200 dark:border-indigo-700 rounded-lg overflow-hidden shadow-sm">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-indigo-900 dark:text-indigo-100 ml-3">
                Current Configuration
              </h3>
            </div>
              <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Provider:</span>
                <span className="text-sm text-indigo-900 dark:text-indigo-100 font-mono">
                  {sttConfig.stt.find(p => p.value === selectedProvider)?.name} ({selectedProvider})
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Model:</span>
                <span className="text-sm text-indigo-900 dark:text-indigo-100 font-mono">
                  {sttConfig.stt.find(p => p.value === selectedProvider)?.models.find(m => m.value === selectedModel)?.name} ({selectedModel})
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Language:</span>
                <span className="text-sm text-indigo-900 dark:text-indigo-100 font-mono">
                  {sttConfig.stt.find(p => p.value === selectedProvider)?.models.find(m => m.value === selectedModel)?.languages.find(l => l.value === selectedLanguage)?.name} ({selectedLanguage})
                </span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-indigo-200 dark:border-indigo-700">
              <p className="text-xs text-indigo-600 dark:text-indigo-400">
                Configuration automatically saved to local storage
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Help Section */}
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
          Configuration Help
        </h4>
        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
          <li>• Select a provider to see available models</li>
          <li>• Choose a model to view supported languages</li>
          <li>• Your selection is automatically saved for future sessions</li>
          <li>• Different providers offer different accuracy and speed characteristics</li>
        </ul>
      </div>
    </div>
  );
}
