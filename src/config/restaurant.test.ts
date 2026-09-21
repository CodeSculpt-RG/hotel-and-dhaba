import { describe, expect, it } from 'vitest'
import { menu, restaurant, reviews } from './restaurant'

describe('restaurant content', () => {
  it('uses the Aman Dhaba identity and keeps unknown links empty', () => {
    expect(restaurant.restaurantName).toBe('Aman Dhaba')
    expect(restaurant.orderUrl).toBe('')
    expect(restaurant.reservationUrl).toBe('')
  })

  it('provides data-driven menu categories and labelled review placeholders', () => {
    expect(menu.length).toBeGreaterThan(5)
    expect(menu.every((category) => category.items.length > 0)).toBe(true)
    expect(reviews.every((review) => review.placeholder)).toBe(true)
  })
})
