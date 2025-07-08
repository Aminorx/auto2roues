Here's the fixed version with all missing closing brackets added:

```typescript
              {needsRegistrationNumber() && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Numéro d'immatriculation (optionnel)
                  </label>
                  <input
                    type="text"
                    value={formData.registrationNumber || ''}
                    onChange={(e) => updateFormData('registrationNumber', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-bolt-500 focus:border-primary-bolt-500 transition-all"
                    placeholder="Ex: AB-123-CD"
                    maxLength={20}
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Ce numéro nous aidera à pré-remplir automatiquement les informations de votre véhicule
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      }
    }
  }
}
```