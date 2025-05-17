"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { getCountries } from "@/lib/timezone-utils"
import type { Country } from "@/types"

interface CountrySelectorProps {
  onSelect: (timezone: string, countryCode: string, countryName: string) => void
}

export default function CountrySelector({ onSelect }: CountrySelectorProps) {
  const [open, setOpen] = useState(false)
  const [countries, setCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countriesData = await getCountries()
        setCountries(countriesData)
      } catch (error) {
        console.error("Failed to fetch countries:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  const handleSelect = (country: Country) => {
    onSelect(country.timezone, country.code, country.name)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          <span>Add a clock</span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <CommandEmpty>No country found.</CommandEmpty>
            {loading ? (
              <div className="py-6 text-center text-sm text-muted-foreground">Loading countries...</div>
            ) : (
              <CommandGroup className="max-h-[300px] overflow-auto">
                {countries.map((country) => (
                  <CommandItem key={country.code} value={country.name} onSelect={() => handleSelect(country)}>
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                        width="20"
                        height="15"
                        alt={`${country.name} flag`}
                        className="rounded-sm"
                      />
                      <span>{country.name}</span>
                    </div>
                    <Check className={cn("ml-auto h-4 w-4", "opacity-0")} />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
