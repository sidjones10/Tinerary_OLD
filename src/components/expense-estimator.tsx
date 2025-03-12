"use client"

import type React from "react"

import { useState } from "react"
import { Calculator, DollarSign, Hotel, Plane, Utensils, MapPin, Plus, Minus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DatePicker } from "@/components/date-picker"

interface ExpenseCategory {
  name: string
  icon: React.ReactNode
  min: number
  max: number
  value: number
  enabled: boolean
}

export function ExpenseEstimator() {
  const [destination, setDestination] = useState("")
  const [travelers, setTravelers] = useState(2)
  const [days, setDays] = useState(3)
  const [categories, setCategories] = useState<ExpenseCategory[]>([
    {
      name: "Accommodation",
      icon: <Hotel className="h-5 w-5" />,
      min: 50,
      max: 500,
      value: 150,
      enabled: true,
    },
    {
      name: "Transportation",
      icon: <Plane className="h-5 w-5" />,
      min: 100,
      max: 2000,
      value: 400,
      enabled: true,
    },
    {
      name: "Food & Dining",
      icon: <Utensils className="h-5 w-5" />,
      min: 20,
      max: 200,
      value: 60,
      enabled: true,
    },
    {
      name: "Activities",
      icon: <MapPin className="h-5 w-5" />,
      min: 0,
      max: 200,
      value: 40,
      enabled: true,
    },
  ])

  const updateCategoryValue = (index: number, value: number) => {
    const newCategories = [...categories]
    newCategories[index].value = value
    setCategories(newCategories)
  }

  const toggleCategory = (index: number) => {
    const newCategories = [...categories]
    newCategories[index].enabled = !newCategories[index].enabled
    setCategories(newCategories)
  }

  const calculateTotal = () => {
    return categories
      .filter((cat) => cat.enabled)
      .reduce((total, cat) => {
        if (cat.name === "Transportation") {
          return total + cat.value * travelers // Transportation is per person, not per day
        }
        if (cat.name === "Accommodation") {
          return total + cat.value * days // Accommodation is per day, not per person
        }
        return total + cat.value * days * travelers
      }, 0)
  }

  const handleTravelersChange = (change: number) => {
    const newValue = travelers + change
    if (newValue >= 1 && newValue <= 20) {
      setTravelers(newValue)
    }
  }

  const handleDaysChange = (change: number) => {
    const newValue = days + change
    if (newValue >= 1 && newValue <= 30) {
      setDays(newValue)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="mr-2 h-5 w-5 text-orange-500" />
          Trip Expense Estimator
        </CardTitle>
        <CardDescription>Estimate your trip budget based on destination, duration, and preferences</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <div className="flex items-center border rounded-md">
              <MapPin className="ml-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="destination"
                placeholder="City, Country"
                className="border-0"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Travel Dates</Label>
            <div className="grid grid-cols-2 gap-2">
              <DatePicker />
              <DatePicker />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Number of Travelers</Label>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleTravelersChange(-1)}
                disabled={travelers <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="w-12 text-center font-medium">{travelers}</div>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleTravelersChange(1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Number of Days</Label>
            <div className="flex items-center">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleDaysChange(-1)}
                disabled={days <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <div className="w-12 text-center font-medium">{days}</div>
              <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleDaysChange(1)}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="categories">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="categories">Expense Categories</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="space-y-4 pt-4">
            {categories.map((category, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center">
                    <div className="mr-2 text-orange-500">{category.icon}</div>
                    {category.name}
                  </Label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">
                      ${category.value}
                      {category.name === "Food & Dining" || category.name === "Activities"
                        ? "/person/day"
                        : category.name === "Accommodation"
                          ? "/night"
                          : "/person"}
                    </span>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={category.enabled}
                        onChange={() => toggleCategory(index)}
                        id={`toggle-${index}`}
                      />
                      <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-orange-500"></div>
                    </div>
                  </div>
                </div>

                {category.enabled && (
                  <div className="space-y-1">
                    <Slider
                      value={[category.value]}
                      min={category.min}
                      max={category.max}
                      step={5}
                      onValueChange={(value) => updateCategoryValue(index, value[0])}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>${category.min}</span>
                      <span>${category.max}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </TabsContent>

          <TabsContent value="summary" className="pt-4">
            <div className="space-y-4">
              <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">Estimated Total:</span>
                  <span className="text-xl font-bold text-orange-600">${calculateTotal().toLocaleString()}</span>
                </div>
                <p className="text-sm text-orange-700">
                  This estimate is based on {travelers} {travelers === 1 ? "traveler" : "travelers"} for {days}{" "}
                  {days === 1 ? "day" : "days"}.
                </p>
              </div>

              <div className="space-y-2">
                {categories
                  .filter((cat) => cat.enabled)
                  .map((category, index) => {
                    let totalForCategory = 0
                    if (category.name === "Transportation") {
                      totalForCategory = category.value * travelers
                    } else if (category.name === "Accommodation") {
                      totalForCategory = category.value * days
                    } else {
                      totalForCategory = category.value * days * travelers
                    }

                    return (
                      <div key={index} className="flex justify-between py-2 border-b">
                        <div className="flex items-center">
                          <div className="mr-2 text-orange-500">{category.icon}</div>
                          <span>{category.name}</span>
                        </div>
                        <span className="font-medium">${totalForCategory.toLocaleString()}</span>
                      </div>
                    )
                  })}
              </div>

              <div className="pt-2">
                <Button variant="outline" className="w-full">
                  <DollarSign className="mr-2 h-4 w-4" />
                  Add to Trip Budget
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

