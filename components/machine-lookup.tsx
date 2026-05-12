"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatMachineSlug } from "@/lib/utils"

interface Brand {
  id: number
  name: string
}

interface Machine {
  id: number
  brand_id: number
  model_name: string
  machine_type?: string
  track_size?: string
}

interface MachineLookupProps {
  brands: Brand[]
  machines: Machine[]
}

export function MachineLookup({ brands, machines }: MachineLookupProps) {
  const router = useRouter()
  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredBrands, setFilteredBrands] = useState<Brand[]>([])
  const [filteredMachines, setFilteredMachines] = useState<Machine[]>([])
  const [showBrandDropdown, setShowBrandDropdown] = useState(false)
  const [showMachineDropdown, setShowMachineDropdown] = useState(false)
  const brandInputRef = useRef<HTMLInputElement>(null)
  const machineInputRef = useRef<HTMLInputElement>(null)

  // Filter brands based on search
  useEffect(() => {
    if (searchQuery.length > 0 && !selectedBrand) {
      const filtered = brands.filter((brand) =>
        brand.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredBrands(filtered.slice(0, 10))
      setShowBrandDropdown(true)
    } else {
      setFilteredBrands([])
      setShowBrandDropdown(false)
    }
  }, [searchQuery, brands, selectedBrand])

  // Filter machines based on selected brand and search
  useEffect(() => {
    if (selectedBrand && searchQuery.length > 0) {
      const filtered = machines.filter(
        (machine) =>
          machine.brand_id === selectedBrand.id &&
          machine.model_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredMachines(filtered.slice(0, 10))
      setShowMachineDropdown(true)
    } else if (selectedBrand && searchQuery.length === 0) {
      const filtered = machines.filter((machine) => machine.brand_id === selectedBrand.id)
      setFilteredMachines(filtered.slice(0, 10))
      setShowMachineDropdown(false)
    } else {
      setFilteredMachines([])
      setShowMachineDropdown(false)
    }
  }, [selectedBrand, searchQuery, machines])

  const handleBrandSelect = useCallback((brand: Brand) => {
    setSelectedBrand(brand)
    setSearchQuery("")
    setShowBrandDropdown(false)
    machineInputRef.current?.focus()
  }, [])

  const handleMachineSelect = useCallback(
    (machine: Machine) => {
      if (selectedBrand) {
        const slug = formatMachineSlug(selectedBrand.name, machine.model_name)
        router.push(`/machines/${slug}`)
      }
    },
    [selectedBrand, router]
  )

  const handleReset = useCallback(() => {
    setSelectedBrand(null)
    setSearchQuery("")
    setFilteredBrands([])
    setFilteredMachines([])
    brandInputRef.current?.focus()
  }, [])

  const getBrandName = (brandId: number) => {
    const brand = brands.find((b) => b.id === brandId)
    return brand?.name || ""
  }

  return (
    <Card className="w-full max-w-2xl border-2 border-primary/20 bg-card shadow-xl">
      <CardContent className="p-6">
        <div className="mb-4 text-center">
          <h2 className="text-xl font-bold text-foreground">Find Parts for Your Machine</h2>
          <p className="text-sm text-muted-foreground">
            Select your equipment brand and model to find compatible parts
          </p>
        </div>

        <div className="space-y-4">
          {/* Step 1: Brand Selection */}
          <div className="relative">
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Step 1: Select Equipment Brand
            </label>
            {selectedBrand ? (
              <div className="flex items-center gap-2">
                <div className="flex-1 rounded-md border bg-muted/50 px-3 py-2 font-medium">
                  {selectedBrand.name}
                </div>
                <Button variant="outline" size="sm" onClick={handleReset}>
                  Change
                </Button>
              </div>
            ) : (
              <>
                <Input
                  ref={brandInputRef}
                  type="text"
                  placeholder="Type to search brands (e.g., Bobcat, Caterpillar)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (searchQuery.length > 0) setShowBrandDropdown(true)
                  }}
                  className="w-full"
                />
                {showBrandDropdown && filteredBrands.length > 0 && (
                  <div className="absolute top-full z-50 mt-1 w-full rounded-md border bg-popover shadow-lg">
                    {filteredBrands.map((brand) => (
                      <button
                        key={brand.id}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-muted focus:bg-muted focus:outline-none"
                        onClick={() => handleBrandSelect(brand)}
                      >
                        {brand.name}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* Step 2: Model Selection */}
          <div className="relative">
            <label className="mb-1.5 block text-sm font-medium text-foreground">
              Step 2: Select Machine Model
            </label>
            <Input
              ref={machineInputRef}
              type="text"
              placeholder={
                selectedBrand
                  ? `Search ${selectedBrand.name} models...`
                  : "Select a brand first..."
              }
              value={selectedBrand ? searchQuery : ""}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (selectedBrand && searchQuery.length > 0) setShowMachineDropdown(true)
              }}
              disabled={!selectedBrand}
              className="w-full"
            />
            {showMachineDropdown && filteredMachines.length > 0 && (
              <div className="absolute top-full z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-md border bg-popover shadow-lg">
                {filteredMachines.map((machine) => (
                  <button
                    key={machine.id}
                    className="w-full px-3 py-2 text-left hover:bg-muted focus:bg-muted focus:outline-none"
                    onClick={() => handleMachineSelect(machine)}
                  >
                    <div className="font-medium">{machine.model_name}</div>
                    <div className="text-xs text-muted-foreground">
                      {machine.machine_type}
                      {machine.track_size && ` - ${machine.track_size}`}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          {selectedBrand && filteredMachines.length > 0 && !showMachineDropdown && (
            <div>
              <p className="mb-2 text-sm text-muted-foreground">Popular {selectedBrand.name} models:</p>
              <div className="flex flex-wrap gap-2">
                {filteredMachines.slice(0, 5).map((machine) => (
                  <Button
                    key={machine.id}
                    variant="outline"
                    size="sm"
                    onClick={() => handleMachineSelect(machine)}
                  >
                    {machine.model_name}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 border-t pt-4 text-center">
          <p className="text-sm text-muted-foreground">
            Can&apos;t find your machine?{" "}
            <a href="tel:+17139410170" className="font-medium text-primary hover:underline">
              Call (713) 941-0170
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
